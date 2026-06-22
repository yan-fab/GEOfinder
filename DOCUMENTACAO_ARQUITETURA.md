# Documentação de Arquitetura: geoBR Explorer + Layer Builder

Esta documentação descreve a estrutura atual do sistema `geoBR Explorer`, que foi expandido para atuar como uma plataforma unificada de geração de códigos para pacotes R/Python e como um motor geoespacial sob demanda para o QGIS.

---

## 1. Visão Geral do Sistema
A arquitetura é dividida em dois grandes blocos que se comunicam via API REST, mantendo o frontend isolado do processamento pesado de GIS.

### Fluxo de Comunicação
```text
[ Frontend Web ]  <--(HTTP/REST)-->  [ API Flask (Layer Builder) ]  <--(Subprocess)-->  [ Builder Engine (GeoPandas/QGIS) ]
```

---

## 2. Estrutura de Diretórios

### `C:\Users\yanju\.gemini\antigravity\scratch\geobr\`
Repositório principal do projeto. Contém o pacote geoBR, a documentação e o frontend da aplicação.

*   📁 **`frontend/`**
    *   `index.html`: Estrutura da interface do usuário (barra lateral, abas de consulta, gerador de códigos, painel do banco local e construtor de camadas).
    *   `app.js`: Lógica de gerenciamento de estado da UI, formatação de requisições, WebSockets simulados (Server-Sent Events) para logs do builder, e integração com a API.
    *   `style.css`: Estilização premium com efeitos Glassmorphism, temas escuros, transições suaves e responsividade.
*   📄 **`INICIAR.bat`**
    *   Script unificado de partida do ecossistema. 
    *   Inicia a API Flask e o Servidor Web do Frontend **em segundo plano** de forma persistente utilizando o comando `wmic process call create`.

### `C:\Users\yanju\.gemini\antigravity\scratch\geo_workspace\`
Repositório focado no processamento de dados brutos e no motor de geração de camadas (onde toda a mágica geoespacial acontece).

*   📁 **`layer_builder/`** (Backend e Processamento)
    *   `api_server.py`: Servidor Web Flask (porta `5050`). Expõe os métodos:
        *   `GET /api/layers`: Retorna as camadas registradas.
        *   `POST /api/build`: Dispara um subprocesso do motor de construção de camadas.
        *   `GET /api/status/<id>`: Retorna o status de uma construção (executando, concluída, falha).
        *   `GET /api/logs/<id>`: Stream de logs em tempo real do processamento (Event-Stream).
        *   `GET /api/outputs`: Lista os arquivos gerados prontos para download.
    *   `builder_engine.py`: O "cérebro" GIS. Um script Python autônomo.
        *   Faz o bypass e a importação correta das DLLs do ambiente do QGIS 3.44.7 (PROJ/GDAL/GEOS) antes de inicializar bibliotecas.
        *   Contém os conectores unificados (`build_from_wfs`, `build_ckan_wfs_crossover`, `build_from_api`, `build_geojson_layer`, etc.).
        *   Cruza dados brutos ou CSVs com geometrias espaciais, transformando tudo em `EPSG:4326` e salvando como `.gpkg` ou `.geojson`.
    *   `start_api.bat`: Script intermediário de proxy. É responsável por chamar as definições nativas do QGIS (`o4w_env.bat`) antes de subir o `api_server.py`, garantindo que os subprocessos herdem variáveis corretas (como `GDAL_DATA` e `PROJ_DATA`).
*   📁 **`output_layers/`**
    *   Diretório de destino de todas as camadas compiladas. A API monitora esta pasta para disponibilizar arquivos de download para o usuário no frontend.
*   📁 **`cache/`**
    *   Sistema básico implementado no motor que salva geometrias pesadas e JSONs em disco (como `malha_br_estados.geojson` e `malha_sp_municipios.geojson`) para evitar requisições desnecessárias a servidores externos a cada run.

---

## 3. Integração Implementada (Prefeitura de São Paulo)

Conforme a `documentacao_integracao_pmsp.md`, o sistema teve suas capacidades estendidas para atuar como ponte nativa com as bases abertas de SP:

1.  **Conexão Nativa GeoSampa (WFS):** 
    O `builder_engine.py` utiliza requisições espaciais automatizadas para capturar features completas de polígonos/linhas hospedadas no GeoServer municipal (Ex: `geoportal:distrito_municipal`), convertendo seus sitemas de referência antigos para os padrões web atuais.
2.  **Crossover CKAN + GeoSampa:**
    O motor consegue ler datasets que não possuem geometria (tabelas e planilhas hospedadas na API do CKAN) e cruzar de forma automatizada com as malhas fornecidas pelo WFS do GeoSampa através de chaves textuais (ex: nome do distrito), exportando um pacote rico para o QGIS.

A adição de novas camadas agora é modular e feita puramente atualizando o dicionário `LAYER_REGISTRY` presente no `api_server.py` e `builder_engine.py`.

---

## 4. Testes e Estabilidade
O sistema foi testado de ponta a ponta ("End-to-End"):
- Frontend é capaz de navegar entre as ferramentas e instanciar os pacotes R/Python com seleções aninhadas.
- O Painel do Construtor se comunica via REST com o Backend, processando requisições assíncronas.
- O Log Viewer atualiza a interface dinamicamente conforme os jobs no motor Python são processados.
- As integrações da PMSP (GeoSampa e cruzamentos CKAN) foram injetadas nos registros e as opções aparecem e funcionam perfeitamente na interface final.
