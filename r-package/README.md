# GEOfinder: Download Official Spatial Data Sets of Brazil

<p align="justify">
GEOfinder is a computational package to download official spatial data sets
of Brazil. The package covers a wide range of spatial data sets,
available at various geographic scales and for various years with
harmonized attributes, projection and fixed topology (see detailed list
of available data sets below).
</p>

The package is currently available in **R** and **Python**.

## Installation R

``` r
# Install the development version from GitHub
utils::remove.packages('geobr')
remotes::install_github("yan-fab/geobr", subdir = "r-package")
```

obs. If you use **Linux**, you need to install a couple dependencies
before installing the libraries `sf` and `geobr`. [More info
here](https://github.com/r-spatial/sf#linux).

## Installation Python

``` bash
pip install git+https://github.com/yan-fab/GEOfinder.git#subdirectory=python-package
```

*Windows users:*

``` bash
conda create -n geo_env
conda activate geo_env  
conda config --env --add channels conda-forge  
conda config --env --set channel_priority strict  
conda install python=3 geopandas  
pip install git+https://github.com/yan-fab/GEOfinder.git#subdirectory=python-package
```

# Basic Usage

The syntax of all `geobr` functions operate on the same logic so it
becomes intuitive to download any data set using a single line of code.
Like this:

## R, reading the data as an `sf` object

``` r
library(geobr)

# Read specific municipality at a given year
mun <- read_municipality(code_muni = 1200179, year = 2022)

# Read all municipalities of given state at a given year
mun <- read_municipality(code_muni = "RJ", year = 2022) # or
mun <- read_municipality(code_muni = 33, year = 2022)

# Read all municipalities in the country at a given year
mun <- read_municipality(code_muni="all", year = 2022)
```

## Python, reading the data as a `geopandas` object

``` python
from geobr import read_municipality

# Read specific municipality at a given year
mun = read_municipality(code_muni=1200179, year=2017)

# Read all municipalities of given state at a given year
mun = read_municipality(code_muni=33, year=2010) # or
mun = read_municipality(code_muni="RJ", year=2010)

# Read all municipalities in the country at a given year
mun = read_municipality(code_muni="all", year=2018)
```

# Available datasets:

You can check all the data sets available with `list_geobr()`

| Function | Geographies available | Source | Years available |
|:---|:---|:---|:---|
| read_amazon | Brazil’s Legal Amazon | MMA | 2019, 2020, 2021, 2022, 2024 |
| read_biomes | Biomes | IBGE | 2006, 2019, 2025 |
| read_census_tract | Census tract (setor censitário) | IBGE | 2000, 2010, 2022 |
| read_conservation_units | Environmental Conservation Units | MMA | 202402, 202503 |
| read_country | Country | IBGE | 1872, 1900, 1911, 1920, 1933, 1940, 1950, 1960, 1970, 1980, 1991, 2000, 2001, 2010, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 |
| read_disaster_risk_area | Disaster risk areas | CEMADEN and IBGE | 2010 |
| read_favelas | Favelas and urban communities | IBGE | 2022 |
| read_health_facilities | Health facilities | CNES, DataSUS | 201704, 201707, 201710, 201801, 201804, 201807, 201810, 201901, 201904, 201907, 201910, 202001, 202004, 202007, 202010, 202101, 202104, 202107, 202110, 202201, 202204, 202207, 202210, 202301, 202304, 202307, 202310, 202401, 202404, 202407, 202410, 202501, 202504, 202507, 202510, 202601 |
| read_health_region | Health regions and macro regions | DataSUS | 1991, 1994, 1997, 2001, 2005, 2013, 2023, 2024, 2025 |
| read_immediate_region | Immediate region | IBGE | 2019, 2020, 2021, 2022, 2023, 2024, 2025 |
| read_indigenous_land | Indigenous lands | FUNAI | 2016, 2017, 2018, 2019, 2022, 2024, 2025 |
| read_intermediate_region | Intermediate region | IBGE | 2019, 2020, 2021, 2022, 2023, 2024, 2025 |
| read_meso_region | Meso region | IBGE | 2000, 2001, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022 |
| read_metro_area | Metropolitan areas | IBGE | 1970, 2001, 2002, 2003, 2005, 2008, 2009, 2010, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024 |
| read_micro_region | Micro region | IBGE | 2000, 2001, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022 |
| read_municipality | Municipality | IBGE | 1872, 1900, 1911, 1920, 1933, 1940, 1950, 1960, 1970, 1980, 1991, 2000, 2001, 2005, 2007, 2010, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 |
| read_municipal_seat | Municipality seats (sedes municipais) | IBGE | 1872, 1900, 1911, 1920, 1933, 1940, 1950, 1960, 1970, 1980, 1991, 2010, 2022 |
| read_neighborhood | Neighborhood limits | IBGE | 2010, 2022 |
| read_polling_places | Voting places | TSE | 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024 |
| read_urban_concentrations | Urban concentration areas (concentrações urbanas) | IBGE | 2010 |
| read_pop_arrangements | Population arrangements (arranjos populacionais) | IBGE | 2010 |
| read_quilombola_lands | Quilombola lands officialy recognized | Incra | 202605 |
| read_comparable_areas | Historically comparable municipalities, aka áreas mínimas comparáveis (AMCs) | IBGE | temporarily suspended |
| read_region | Region | IBGE | 1872, 1900, 1911, 1920, 1933, 1940, 1950, 1960, 1970, 1980, 1991, 2000, 2001, 2010, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 |
| read_schools | Schools | INEP | 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 |
| read_semiarid | Semi Arid region | IBGE | 2005, 2017, 2021, 2022 |
| read_state | States | IBGE | 1872, 1900, 1911, 1920, 1933, 1940, 1950, 1960, 1970, 1980, 1991, 2000, 2001, 2010, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 |
| read_statistical_grid | Statistical Grid (gridded population) | IBGE | 2010 |
| read_urban_area | Urban footprints | IBGE | 2005, 2015, 2019 |
| read_weighting_area | Census weighting area (área de ponderação) | IBGE | 2010 |

point_right: **All datasets use geodetic reference system “SIRGAS2000”,
CRS(4674).**

## Other support functions:

| Function | Action |
|----|----|
| `list_geobr` | List all datasets available in the geobr package |
| `lookup_muni` | Look up municipality codes by their name, or the other way around |
| `remove_islands` | Removes distant oceanic islands from Brazil |
| `grid_state_correspondence_table` | Loads a correspondence table indicating what quadrants of IBGE’s statistical grid intersect with each state |
| `cep_to_state` | Determine the state of a given CEP postal code |
| … | … |

Note 1. Data sets and Functions marked with “dev” are only available in
the development version of `geobr`.

Note 2. Most data sets are available at scale 1:250,000 (see
documentation for details).

# Credits

Original shapefiles are created by official government institutions. The
**GEOfinder** package is maintained by yanju. If you want to cite this package, you
can cite it as:

- yanju (2026) **GEOfinder: Download Official Spatial Data Sets of Brazil**. v2.0.0 GitHub repository.

