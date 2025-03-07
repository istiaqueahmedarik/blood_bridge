import { StyleSpecification } from "mapbox-gl";

export const design: StyleSpecification = {
    "version": 8,
    "name": "Russian mail networks",
    "center": [
        40.120953763609805,
        53.27901610987584
    ],
    "zoom": 5.483830379902873,
    "bearing": 0,
    "pitch": 0,
    "sources": {
        "mapbox": {
            "url": "mapbox://mapbox.mapbox-streets-v6",
            "type": "vector"
        },
        "mapbox://mapbox.mapbox-terrain-v2": {
            "url": "mapbox://mapbox.mapbox-terrain-v2",
            "type": "vector"
        },
        "mapbox://ru.pl0vqjzp": {
            "url": "mapbox://ru.pl0vqjzp",
            "type": "vector"
        },
        "mapbox://ru.wtl1ivlf": {
            "url": "mapbox://ru.wtl1ivlf",
            "type": "vector"
        },
        "mapbox://ru.dxwgugge": {
            "url": "mapbox://ru.dxwgugge",
            "type": "vector"
        }
    },
    "sprite": "mapbox://sprites/maper/cihpzjjhv001ibrlzxk0j8gmp",
    "glyphs": "mapbox://fonts/maper/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "background-color": "#111"
            },

        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "class",
                "snow"
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "landcover_snow",
            "paint": {
                "fill-color": "#000",
                "fill-opacity": 0.5
            },
            "source-layer": "landcover"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "class",
                "crop"
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "landcover_crop",
            "paint": {
                "fill-color": "#131313",
                "fill-opacity": 0.5
            },
            "source-layer": "landcover"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "class",
                "grass"
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "landcover_grass",
            "paint": {
                "fill-color": "#1a1a1a",
                "fill-opacity": 0.5
            },
            "source-layer": "landcover"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "class",
                "scrub"
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "landcover_scrub",
            "paint": {
                "fill-color": "#1c1c1c",
                "fill-opacity": 0.5
            },
            "source-layer": "landcover"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "class",
                "wood"
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "landcover_wood",
            "paint": {
                "fill-color": "#232323",
                "fill-opacity": 0.5
            },
            "source-layer": "landcover"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Polygon"
                ],
                [
                    "==",
                    "class",
                    "industrial"
                ]
            ],
            "type": "fill",
            "source": "mapbox",
            "id": "landuse_industrial",
            "paint": {
                "fill-color": "#000",
                "fill-opacity": 0.5
            },
            "source-layer": "landuse"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "class",
                "park"
            ],
            "type": "fill",
            "source": "mapbox",
            "id": "landuse_park",
            "paint": {
                "fill-color": "#1b1b1b"
            },
            "source-layer": "landuse"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "class",
                "wood"
            ],
            "type": "fill",
            "source": "mapbox",
            "id": "landuse_wood",
            "paint": {
                "fill-color": "#1f1f1f"
            },
            "source-layer": "landuse"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "level",
                94
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "hillshade_highlight_bright",
            "paint": {
                "fill-color": "#000",
                "fill-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            15,
                            0.15
                        ],
                        [
                            17,
                            0.05
                        ]
                    ]
                }
            },
            "source-layer": "hillshade"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "level",
                90
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "hillshade_highlight_med",
            "paint": {
                "fill-color": "#000",
                "fill-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            15,
                            0.15
                        ],
                        [
                            17,
                            0.05
                        ]
                    ]
                }
            },
            "source-layer": "hillshade"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "level",
                89
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "hillshade_shadow_faint",
            "paint": {
                "fill-color": "#999999",
                "fill-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            14,
                            0.06
                        ],
                        [
                            17,
                            0.01
                        ]
                    ]
                }
            },
            "source-layer": "hillshade"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "level",
                78
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "hillshade_shadow_med",
            "paint": {
                "fill-color": "#999999",
                "fill-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            14,
                            0.06
                        ],
                        [
                            17,
                            0.01
                        ]
                    ]
                }
            },
            "source-layer": "hillshade"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "level",
                67
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "hillshade_shadow_dark",
            "paint": {
                "fill-color": "#888888",
                "fill-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            14,
                            0.06
                        ],
                        [
                            17,
                            0.01
                        ]
                    ]
                }
            },
            "source-layer": "hillshade"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "level",
                56
            ],
            "type": "fill",
            "source": "mapbox://mapbox.mapbox-terrain-v2",
            "id": "hillshade_shadow_extreme",
            "paint": {
                "fill-color": "#999",
                "fill-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            14,
                            0.06
                        ],
                        [
                            17,
                            0.01
                        ]
                    ]
                }
            },
            "source-layer": "hillshade"
        },
        {
            "id": "building",
            "type": "fill",
            "source": "mapbox",
            "source-layer": "building",
            "minzoom": 15,
            "paint": {
                "fill-outline-color": "#444444",
                "fill-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            15,
                            0
                        ],
                        [
                            16.5,
                            1
                        ]
                    ]
                },
                "fill-antialias": true,
                "fill-color": "#383838"
            },

        },
        {
            "id": "waterway",
            "type": "line",
            "source": "mapbox",
            "source-layer": "waterway",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "class",
                    "river",
                    "canal"
                ]
            ],
            "paint": {
                "line-color": "#2c2c2c",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            6,
                            0.25
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            },

        },
        {
            "id": "waterway_stream",
            "type": "line",
            "source": "mapbox",
            "source-layer": "waterway",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "class",
                    "stream"
                ]
            ],
            "paint": {
                "line-color": "#2c2c2c",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            13,
                            0.75
                        ],
                        [
                            20,
                            4
                        ]
                    ]
                }
            },

        },
        {
            "id": "water",
            "type": "fill",
            "source": "mapbox",
            "source-layer": "water",
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "fill-color": "#2c2c2c"
            },

        },
        {

            "layout": {
                "line-join": "miter",
                "visibility": "visible"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "type",
                    "runway"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "aeroway_runway",
            "paint": {
                "line-width": {
                    "base": 1.15,
                    "stops": [
                        [
                            11,
                            3
                        ],
                        [
                            20,
                            32
                        ]
                    ]
                },
                "line-color": "#000",
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            9,
                            0.5
                        ],
                        [
                            11,
                            1
                        ]
                    ]
                }
            },
            "source-layer": "aeroway"
        },
        {

            "layout": {
                "line-join": "miter"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "type",
                    "taxiway"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "aeroway_taxiway",
            "paint": {
                "line-width": {
                    "base": 1.15,
                    "stops": [
                        [
                            10,
                            0.25
                        ],
                        [
                            11,
                            1
                        ],
                        [
                            20,
                            8
                        ]
                    ]
                },
                "line-color": "#3c3c3c"
            },
            "source-layer": "aeroway"
        },
        {
            "id": "tunnel_minor",
            "type": "line",
            "source": "mapbox",
            "source-layer": "tunnel",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "class",
                    "motorway_link",
                    "street",
                    "street_limited",
                    "service",
                    "driveway",
                    "path"
                ]
            ],
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.55,
                    "stops": [
                        [
                            4,
                            0.25
                        ],
                        [
                            20,
                            20
                        ]
                    ]
                },
                "line-dasharray": [
                    0.36,
                    0.18
                ]
            },

        },
        {
            "id": "tunnel_major",
            "type": "line",
            "source": "mapbox",
            "source-layer": "tunnel",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "class",
                    "motorway",
                    "main"
                ]
            ],
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            6,
                            0.5
                        ],
                        [
                            20,
                            30
                        ]
                    ]
                },
                "line-dasharray": [
                    0.28,
                    0.14
                ]
            },

        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "class",
                "path"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-path",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            15,
                            1
                        ],
                        [
                            18,
                            4
                        ]
                    ]
                }
            },
            "source-layer": "road"
        },
        {

            "minzoom": 11,
            "layout": {
                "visibility": "visible"
            },
            "maxzoom": 14.1,
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "class",
                    "street",
                    "street_limited"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-street-low-zoom",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            12.5,
                            0.5
                        ],
                        [
                            14,
                            2
                        ],
                        [
                            18,
                            18
                        ]
                    ]
                },
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            11.5,
                            0
                        ],
                        [
                            12,
                            1
                        ]
                    ]
                }
            },
            "source-layer": "road"
        },
        {

            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "filter": [
                "in",
                "class",
                "service",
                "driveway"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-service-driveway",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            14,
                            0.5
                        ],
                        [
                            18,
                            12
                        ]
                    ]
                }
            },
            "source-layer": "road"
        },
        {

            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "filter": [
                "==",
                "class",
                "motorway_link"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-motorway_link",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            12.5,
                            0.5
                        ],
                        [
                            14,
                            2
                        ],
                        [
                            18,
                            18
                        ]
                    ]
                }
            },
            "source-layer": "road"
        },
        {

            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "class",
                    "street_limited"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-street_limited",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            12.5,
                            0.5
                        ],
                        [
                            14,
                            2
                        ],
                        [
                            18,
                            18
                        ]
                    ]
                }
            },
            "source-layer": "road"
        },
        {

            "minzoom": 14,
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "class",
                    "street"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-street",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            12.5,
                            0.3
                        ],
                        [
                            14,
                            2
                        ],
                        [
                            18,
                            18
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "road"
        },
        {

            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "class",
                    "main"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-main",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            6,
                            0.5
                        ],
                        [
                            18,
                            26
                        ]
                    ]
                },
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            5.5,
                            1
                        ]
                    ]
                }
            },
            "source-layer": "road"
        },
        {

            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "main"
                ],
                [
                    "==",
                    "type",
                    "trunk"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-trunk",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            5,
                            0.75
                        ],
                        [
                            18,
                            32
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "road"
        },
        {

            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "filter": [
                "==",
                "class",
                "motorway"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-motorway",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            5,
                            0.75
                        ],
                        [
                            18,
                            32
                        ]
                    ]
                },
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            5.5,
                            1
                        ]
                    ]
                }
            },
            "source-layer": "road"
        },
        {

            "minzoom": 13,
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "filter": [
                "in",
                "class",
                "major_rail",
                "minor_rail"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-rail",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            14,
                            0.5
                        ],
                        [
                            20,
                            1
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "road"
        },
        {

            "minzoom": 13,
            "layout": {
                "line-cap": "butt",
                "line-join": "miter",
                "visibility": "visible"
            },
            "filter": [
                "in",
                "class",
                "major_rail",
                "minor_rail"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road-rail-tracks",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            8
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "road"
        },
        {
            "id": "bridge_minor_case",
            "type": "line",
            "source": "mapbox",
            "source-layer": "bridge",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "class",
                    "motorway_link",
                    "street",
                    "street_limited",
                    "service",
                    "driveway",
                    "path"
                ]
            ],
            "paint": {
                "line-color": "#111",
                "line-width": {
                    "base": 1.6,
                    "stops": [
                        [
                            12,
                            0.5
                        ],
                        [
                            20,
                            10
                        ]
                    ]
                },
                "line-gap-width": {
                    "base": 1.55,
                    "stops": [
                        [
                            4,
                            0.25
                        ],
                        [
                            20,
                            20
                        ]
                    ]
                }
            },

        },
        {

            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "filter": [
                "==",
                "class",
                "path"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-path",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            15,
                            1
                        ],
                        [
                            18,
                            4
                        ]
                    ]
                }
            },
            "source-layer": "bridge"
        },
        {

            "minzoom": 11,
            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "maxzoom": 14.1,
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "class",
                    "street",
                    "street_limited"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-street-low-zoom",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            12.5,
                            0.5
                        ],
                        [
                            14,
                            2
                        ],
                        [
                            18,
                            18
                        ]
                    ]
                },
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            11.5,
                            0
                        ],
                        [
                            12,
                            1
                        ]
                    ]
                }
            },
            "source-layer": "bridge"
        },
        {

            "minzoom": 10,
            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "class",
                    "motorway_link"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-motorway_link",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            12.5,
                            0.5
                        ],
                        [
                            14,
                            2
                        ],
                        [
                            18,
                            18
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "bridge"
        },
        {

            "minzoom": 14,
            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "class",
                    "street_limited"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-street_limited",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            12.5,
                            0.5
                        ],
                        [
                            14,
                            2
                        ],
                        [
                            18,
                            18
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "bridge"
        },
        {

            "minzoom": 14,
            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "filter": [
                "==",
                "class",
                "street"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-street",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            12.5,
                            0.5
                        ],
                        [
                            14,
                            2
                        ],
                        [
                            18,
                            18
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "bridge"
        },
        {

            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "main"
                ],
                [
                    "!=",
                    "type",
                    "trunk"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-main",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            6,
                            0.5
                        ],
                        [
                            18,
                            26
                        ]
                    ]
                },
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            5.5,
                            1
                        ]
                    ]
                }
            },
            "source-layer": "bridge"
        },
        {

            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "main"
                ],
                [
                    "==",
                    "type",
                    "trunk"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-trunk",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            0.5
                        ],
                        [
                            9,
                            1.25
                        ],
                        [
                            20,
                            10
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "bridge"
        },
        {

            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "round"
            },
            "filter": [
                "==",
                "class",
                "motorway"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-motorway",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            0.5
                        ],
                        [
                            9,
                            1.25
                        ],
                        [
                            20,
                            10
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "bridge"
        },
        {

            "minzoom": 13,
            "layout": {
                "visibility": "visible",
                "line-cap": "butt",
                "line-join": "miter",
                "line-round-limit": 2
            },
            "filter": [
                "in",
                "class",
                "major_rail",
                "minor_rail"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-rail",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            14,
                            0.5
                        ],
                        [
                            20,
                            1
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "bridge"
        },
        {

            "minzoom": 14,
            "layout": {
                "visibility": "visible",
                "line-cap": "butt",
                "line-join": "miter",
                "line-round-limit": 2
            },
            "filter": [
                "in",
                "class",
                "major_rail",
                "minor_rail"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-rail-tracks",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            8
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "bridge"
        },
        {

            "minzoom": 14,
            "layout": {
                "visibility": "visible",
                "line-cap": "butt",
                "line-join": "miter",
                "line-round-limit": 2
            },
            "filter": [
                "==",
                "class",
                "aerialway"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge-rail-tracks_copy",
            "paint": {
                "line-color": "#484848",
                "line-width": {
                    "base": 1.5,
                    "stops": [
                        [
                            14,
                            0.5
                        ],
                        [
                            20,
                            1
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "source-layer": "bridge"
        },
        {

            "layout": {
                "visibility": "visible",
                "line-join": "bevel"
            },
            "filter": [
                "all",
                [
                    ">=",
                    "admin_level",
                    3
                ],
                [
                    "==",
                    "maritime",
                    0
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "admin-3-4-boundaries-bg",
            "paint": {
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            3.5
                        ],
                        [
                            12,
                            6
                        ]
                    ]
                },
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            2,
                            0
                        ],
                        [
                            5,
                            0.75
                        ]
                    ]
                },
                "line-color": "#000"
            },
            "source-layer": "admin"
        },
        {

            "layout": {
                "visibility": "visible",
                "line-join": "miter"
            },
            "filter": [
                "all",
                [
                    "==",
                    "admin_level",
                    2
                ],
                [
                    "==",
                    "maritime",
                    0
                ],
                [
                    "==",
                    "disputed",
                    2
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "admin-2-boundaries-bg",
            "paint": {
                "line-color": "#000000",
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            0
                        ],
                        [
                            4,
                            0.75
                        ]
                    ]
                },
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            2,
                            3.5
                        ],
                        [
                            10,
                            10
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {

            "layout": {
                "visibility": "visible",
                "line-join": "miter"
            },
            "filter": [
                "all",
                [
                    "==",
                    "admin_level",
                    3
                ],
                [
                    "==",
                    "maritime",
                    0
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "admin-3-4-boundaries",
            "paint": {
                "line-color": "#797979",
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            2,
                            0
                        ],
                        [
                            3,
                            1
                        ]
                    ]
                },
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            0.5
                        ],
                        [
                            12,
                            2
                        ]
                    ]
                },
                "line-dasharray": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            [
                                2,
                                0
                            ]
                        ],
                        [
                            5,
                            [
                                2,
                                2,
                                6,
                                2
                            ]
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {

            "minzoom": 1,
            "layout": {
                "visibility": "visible",
                "line-join": "round",
                "line-cap": "round"
            },
            "filter": [
                "all",
                [
                    "==",
                    "admin_level",
                    2
                ],
                [
                    "==",
                    "maritime",
                    0
                ],
                [
                    "==",
                    "disputed",
                    0
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "admin-2-boundaries",
            "paint": {
                "line-color": "#5f5f5f",
                "line-opacity": 1,
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            0.5
                        ],
                        [
                            10,
                            2
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "$type",
                "LineString"
            ],
            "type": "line",
            "source": "mapbox://ru.pl0vqjzp",
            "id": "postline_12",
            "paint": {
                "line-color": "rgba(2,219,247,1)",
                "line-opacity": 0.2
            },
            "source-layer": "original"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "$type",
                "LineString"
            ],
            "type": "line",
            "source": "mapbox://ru.dxwgugge",
            "id": "postline-level1",
            "paint": {
                "line-color": "rgba(0,255,255,1)",
                "line-opacity": 0.6,
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            1,
                            1
                        ],
                        [
                            3,
                            1
                        ],
                        [
                            9,
                            1.25
                        ],
                        [
                            20,
                            10
                        ]
                    ]
                }
            },
            "source-layer": "postline_level1"
        },
        {

            "layout": {
                "visibility": "visible"
            },
            "filter": [
                "==",
                "$type",
                "Point"
            ],
            "type": "circle",
            "source": "mapbox://ru.wtl1ivlf",
            "id": "original",
            "paint": {
                "circle-color": "rgba(0,213,255,1)",
                "circle-blur": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            4
                        ],
                        [
                            22,
                            1
                        ]
                    ]
                },
                "circle-opacity": 1,
                "circle-radius": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            5
                        ],
                        [
                            22,
                            10
                        ]
                    ]
                }
            },
            "source-layer": "original"
        },
        {

            "minzoom": 12,
            "layout": {
                "text-font": [
                    "DIN Offc Pro Italic",
                    "Arial Unicode MS Regular"
                ],
                "visibility": "visible",
                "symbol-placement": "line",
                "text-field": "{name_en}",
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            13,
                            12
                        ],
                        [
                            18,
                            16
                        ]
                    ]
                }
            },
            "filter": [
                "==",
                "class",
                "river"
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "waterway-label",
            "paint": {
                "text-color": "#929292"
            },
            "source-layer": "waterway_label"
        },
        {

            "minzoom": 12,
            "layout": {
                "symbol-placement": "line",
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
                "text-transform": "none",
                "text-letter-spacing": 0,
                "text-padding": 0,
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            8,
                            8
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "!in",
                    "class",
                    "motorway",
                    "main",
                    "street_limited",
                    "street"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "road-label-sm",
            "paint": {
                "text-halo-color": "#000",
                "text-halo-width": 2,
                "text-color": "#929292"
            },
            "source-layer": "road_label"
        },
        {

            "layout": {
                "symbol-placement": "line",
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
                "text-transform": "none",
                "text-letter-spacing": 0,
                "text-padding": 0,
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            8,
                            8
                        ],
                        [
                            20,
                            16
                        ]
                    ]
                }
            },
            "filter": [
                "in",
                "class",
                "street",
                "street_limited"
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "road-label-med",
            "paint": {
                "text-halo-color": "#000",
                "text-halo-width": 2,
                "text-color": "#929292"
            },
            "source-layer": "road_label"
        },
        {

            "layout": {
                "symbol-placement": "line",
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
                "text-transform": "none",
                "text-letter-spacing": 0,
                "text-padding": 0,
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            8,
                            8
                        ],
                        [
                            20,
                            17
                        ]
                    ]
                }
            },
            "filter": [
                "in",
                "class",
                "motorway",
                "main"
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "road-label-large",
            "paint": {
                "text-halo-color": "#000",
                "text-halo-width": 2,
                "text-color": "#929292"
            },
            "source-layer": "road_label"
        },
        {

            "layout": {
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "visibility": "visible",
                "text-field": {
                    "base": 1,
                    "stops": [
                        [
                            10,
                            "{name_en}"
                        ],
                        [
                            13,
                            ""
                        ]
                    ]
                },
                "text-max-width": 9,
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            10,
                            10
                        ],
                        [
                            18,
                            18
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "in",
                    "maki",
                    "airport",
                    "heliport",
                    "rocket"
                ],
                [
                    "<=",
                    "scalerank",
                    2
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "airport-label",
            "paint": {
                "text-color": "#999999",
                "text-halo-color": "#000",
                "text-halo-width": 1,
                "text-halo-blur": 0
            },
            "source-layer": "poi_label"
        },
        {

            "layout": {
                "text-max-width": 8,
                "visibility": "visible",
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            10,
                            10
                        ],
                        [
                            18,
                            14
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "scalerank",
                    1
                ],
                [
                    "==",
                    "maki",
                    "park"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "poi-parks-scalerank1",
            "paint": {
                "text-color": "#c2c2c2",
                "text-halo-color": "#000",
                "text-halo-width": 1
            },
            "source-layer": "poi_label"
        },
        {

            "layout": {
                "text-max-width": 8,
                "visibility": "visible",
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            10,
                            10
                        ],
                        [
                            18,
                            14
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "!in",
                    "maki",
                    "rail-light",
                    "rail-metro",
                    "rail",
                    "airport",
                    "airfield",
                    "heliport",
                    "rocket",
                    "park",
                    "golf",
                    "cemetary",
                    "zoo",
                    "campsite",
                    "swimming",
                    "dog-park"
                ],
                [
                    "<=",
                    "scalerank",
                    1
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "poi-scalerank1",
            "paint": {
                "text-color": "#b7b8b7",
                "text-halo-color": "#000",
                "text-halo-width": 1
            },
            "source-layer": "poi_label"
        },
        {
            "id": "water-label",
            "type": "symbol",
            "source": "mapbox",
            "source-layer": "water_label",
            "minzoom": 5,
            "layout": {
                "text-font": [
                    "DIN Offc Pro Italic",
                    "Arial Unicode MS Regular"
                ],
                "visibility": "visible",
                "text-field": "{name_en}",
                "text-max-width": 7,
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            13,
                            12
                        ],
                        [
                            18,
                            16
                        ]
                    ]
                }
            },
            "paint": {
                "text-color": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "#969696"
                        ],
                        [
                            20,
                            "#969696"
                        ]
                    ]
                }
            },

        },
        {

            "minzoom": 12,
            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 7,
                "text-letter-spacing": 0.1,
                "text-transform": "uppercase",
                "text-size": {
                    "stops": [
                        [
                            12,
                            10
                        ],
                        [
                            16,
                            14
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "in",
                    "type",
                    "suburb",
                    "neighbourhood"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_neighborhood",
            "paint": {
                "text-color": "#999999",
                "text-halo-color": "#000",
                "text-halo-width": 1,
                "text-halo-blur": 1,
                "text-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            0
                        ],
                        [
                            12,
                            0.66
                        ],
                        [
                            13,
                            1
                        ]
                    ]
                }
            },
            "source-layer": "place_label"
        },
        {

            "minzoom": 8,
            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 15,
                "text-size": {
                    "stops": [
                        [
                            6,
                            10
                        ],
                        [
                            12,
                            13
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "in",
                    "type",
                    "town",
                    "village",
                    "hamlet"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_other",
            "paint": {
                "text-color": "#999999",
                "text-halo-color": "#000",
                "text-halo-width": 1,
                "text-halo-blur": 1
            },
            "source-layer": "place_label"
        },
        {

            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 10,
                "text-anchor": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "top"
                        ],
                        [
                            6,
                            "center"
                        ]
                    ]
                },
                "text-offset": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            [
                                0,
                                0.1
                            ]
                        ],
                        [
                            6,
                            [
                                0,
                                0
                            ]
                        ]
                    ]
                },
                "text-size": {
                    "stops": [
                        [
                            6,
                            11
                        ],
                        [
                            14,
                            19
                        ]
                    ]
                }
            },
            "maxzoom": 16,
            "filter": [
                "all",
                [
                    "==",
                    "type",
                    "city"
                ],
                [
                    ">",
                    "scalerank",
                    4
                ],
                [
                    "in",
                    "ldir",
                    "S",
                    "E",
                    "SE",
                    "SW"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_city_small_s",
            "paint": {
                "text-color": "#999999",
                "text-halo-color": "#000",
                "text-halo-width": 1.5,
                "text-halo-blur": 0
            },
            "source-layer": "place_label"
        },
        {

            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 10,
                "text-anchor": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "bottom"
                        ],
                        [
                            6,
                            "center"
                        ]
                    ]
                },
                "text-offset": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            [
                                0,
                                -0.2
                            ]
                        ],
                        [
                            6,
                            [
                                0,
                                0
                            ]
                        ]
                    ]
                },
                "text-size": {
                    "stops": [
                        [
                            6,
                            11
                        ],
                        [
                            14,
                            19
                        ]
                    ]
                }
            },
            "maxzoom": 16,
            "filter": [
                "all",
                [
                    "==",
                    "type",
                    "city"
                ],
                [
                    ">",
                    "scalerank",
                    4
                ],
                [
                    "in",
                    "ldir",
                    "N",
                    "W",
                    "NW",
                    "NE"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_city_small_n",
            "paint": {
                "text-color": "#999999",
                "text-halo-color": "#000",
                "text-halo-width": 1.5,
                "text-halo-blur": 0
            },
            "source-layer": "place_label"
        },
        {

            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 10,
                "text-anchor": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "top"
                        ],
                        [
                            6,
                            "center"
                        ]
                    ]
                },
                "text-offset": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            [
                                0,
                                0.1
                            ]
                        ],
                        [
                            6,
                            [
                                0,
                                0
                            ]
                        ]
                    ]
                },
                "text-size": {
                    "stops": [
                        [
                            5,
                            11
                        ],
                        [
                            12,
                            19
                        ]
                    ],
                    "base": 0.9
                }
            },
            "maxzoom": 16,
            "filter": [
                "all",
                [
                    "==",
                    "type",
                    "city"
                ],
                [
                    "<=",
                    "scalerank",
                    4
                ],
                [
                    ">",
                    "scalerank",
                    1
                ],
                [
                    "in",
                    "ldir",
                    "S",
                    "E",
                    "SE",
                    "SW"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_city_medium_s",
            "paint": {
                "text-color": "#999999",
                "text-halo-color": "#000",
                "text-halo-width": 1.5,
                "text-halo-blur": 0
            },
            "source-layer": "place_label"
        },
        {

            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 10,
                "text-anchor": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "bottom"
                        ],
                        [
                            6,
                            "center"
                        ]
                    ]
                },
                "text-offset": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            [
                                0,
                                -0.2
                            ]
                        ],
                        [
                            6,
                            [
                                0,
                                0
                            ]
                        ]
                    ]
                },
                "text-size": {
                    "stops": [
                        [
                            5,
                            11
                        ],
                        [
                            12,
                            19
                        ]
                    ],
                    "base": 0.9
                }
            },
            "maxzoom": 16,
            "filter": [
                "all",
                [
                    "==",
                    "type",
                    "city"
                ],
                [
                    "<=",
                    "scalerank",
                    4
                ],
                [
                    ">",
                    "scalerank",
                    1
                ],
                [
                    "in",
                    "ldir",
                    "N",
                    "W",
                    "NW",
                    "NE"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_city_medium_n",
            "paint": {
                "text-color": "#999999",
                "text-halo-color": "#000",
                "text-halo-width": 1.5,
                "text-halo-blur": 0
            },
            "source-layer": "place_label"
        },
        {

            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 15,
                "text-transform": "none",
                "text-anchor": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "top"
                        ],
                        [
                            6,
                            "center"
                        ]
                    ]
                },
                "text-offset": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            [
                                0,
                                0.1
                            ]
                        ],
                        [
                            6,
                            [
                                0,
                                0
                            ]
                        ]
                    ]
                },
                "text-size": {
                    "stops": [
                        [
                            4,
                            11
                        ],
                        [
                            10,
                            20
                        ]
                    ],
                    "base": 0.9
                }
            },
            "maxzoom": 16,
            "filter": [
                "all",
                [
                    "==",
                    "type",
                    "city"
                ],
                [
                    "<=",
                    "scalerank",
                    1
                ],
                [
                    "in",
                    "ldir",
                    "S",
                    "SE",
                    "SW",
                    "E"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_city_large_s",
            "paint": {
                "text-color": "#999999",
                "text-halo-color": "#000",
                "text-halo-width": 1.5,
                "text-halo-blur": 0
            },
            "source-layer": "place_label"
        },
        {

            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 5,
                "text-transform": "none",
                "text-anchor": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "bottom"
                        ],
                        [
                            6,
                            "center"
                        ]
                    ]
                },
                "text-offset": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            [
                                0,
                                -0.2
                            ]
                        ],
                        [
                            6,
                            [
                                0,
                                0
                            ]
                        ]
                    ]
                },
                "symbol-avoid-edges": false,
                "text-size": {
                    "stops": [
                        [
                            4,
                            11
                        ],
                        [
                            10,
                            20
                        ]
                    ],
                    "base": 0.9
                }
            },
            "maxzoom": 16,
            "filter": [
                "all",
                [
                    "<=",
                    "scalerank",
                    1
                ],
                [
                    "in",
                    "ldir",
                    "N",
                    "NE",
                    "NW",
                    "W"
                ],
                [
                    "==",
                    "type",
                    "city"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_city_large_n",
            "paint": {
                "text-color": "#999999",
                "text-halo-color": "#000",
                "text-halo-width": 1.5,
                "text-halo-blur": 0
            },
            "source-layer": "place_label"
        },
        {

            "layout": {
                "text-max-width": 8,
                "visibility": "none",
                "symbol-placement": "point",
                "text-field": "{name_en}",
                "text-line-height": 1.2,
                "text-letter-spacing": 0.1,
                "text-font": [
                    "DIN Offc Pro Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            12
                        ],
                        [
                            6,
                            16
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "in",
                    "labelrank",
                    4,
                    5,
                    6
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_point_other",
            "paint": {
                "text-color": "#999999"
            },
            "source-layer": "marine_label"
        },
        {

            "layout": {
                "text-max-width": 8,
                "visibility": "visible",
                "symbol-placement": "point",
                "text-field": "{name_en}",
                "text-line-height": 1.3,
                "text-letter-spacing": 0.1,
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            13
                        ],
                        [
                            5,
                            18
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "labelrank",
                    3
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_point_3",
            "paint": {
                "text-color": "#999999",
                "text-opacity": 0.25
            },
            "source-layer": "marine_label"
        },
        {

            "layout": {
                "text-max-width": 8,
                "visibility": "visible",
                "symbol-placement": "point",
                "text-field": "{name_en}",
                "text-line-height": 1.2,
                "text-letter-spacing": 0,
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            14
                        ],
                        [
                            5,
                            24
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "labelrank",
                    2
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_point_2",
            "paint": {
                "text-color": "#999999",
                "text-opacity": 0.25
            },
            "source-layer": "marine_label"
        },
        {

            "layout": {
                "text-max-width": 4,
                "visibility": "visible",
                "symbol-placement": "point",
                "text-field": "{name_en}",
                "text-line-height": 1.5,
                "text-letter-spacing": 0.25,
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            1,
                            12
                        ],
                        [
                            4,
                            30
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "labelrank",
                    1
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_point_1",
            "paint": {
                "text-color": "#999999",
                "text-opacity": 0.25
            },
            "source-layer": "marine_label"
        },
        {

            "layout": {
                "text-max-width": 15,
                "visibility": "visible",
                "symbol-placement": "line",
                "text-field": "{name_en}",
                "text-line-height": 1.2,
                "text-letter-spacing": 0,
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            12
                        ],
                        [
                            6,
                            16
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "labelrank",
                    4,
                    5,
                    6
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_line_other",
            "paint": {
                "text-color": "#999999",
                "text-opacity": 0.25
            },
            "source-layer": "marine_label"
        },
        {

            "layout": {
                "text-max-width": 15,
                "visibility": "visible",
                "symbol-placement": "line",
                "text-field": "{name_en}",
                "text-line-height": 1.2,
                "text-letter-spacing": 0,
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            13
                        ],
                        [
                            5,
                            18
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "labelrank",
                    3
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_line_3",
            "paint": {
                "text-color": "#999999",
                "text-opacity": 0.25
            },
            "source-layer": "marine_label"
        },
        {

            "layout": {
                "text-max-width": 15,
                "visibility": "visible",
                "symbol-placement": "line",
                "text-field": "{name_en}",
                "text-line-height": 1.2,
                "text-letter-spacing": 0,
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            14
                        ],
                        [
                            5,
                            24
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "labelrank",
                    2
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_line_2",
            "paint": {
                "text-color": "#999999",
                "text-opacity": 0.25
            },
            "source-layer": "marine_label"
        },
        {

            "layout": {
                "text-max-width": 15,
                "visibility": "visible",
                "symbol-placement": "line",
                "text-field": "{name_en}",
                "text-line-height": 1.2,
                "text-letter-spacing": 0.4,
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            25
                        ],
                        [
                            4,
                            30
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "labelrank",
                    1
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_line_1",
            "paint": {
                "text-color": "#999999",
                "text-opacity": 0.25
            },
            "source-layer": "marine_label"
        },
        {

            "minzoom": 3,
            "layout": {
                "text-transform": "uppercase",
                "visibility": "visible",
                "text-field": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "{abbr}"
                        ],
                        [
                            4,
                            "{name_en}"
                        ]
                    ]
                },
                "text-font": [
                    "DIN Offc Pro Bold",
                    "Arial Unicode MS Regular"
                ],
                "text-letter-spacing": 0.15,
                "text-max-width": 7,
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            9
                        ],
                        [
                            7,
                            18
                        ]
                    ]
                }
            },
            "maxzoom": 7,
            "filter": [
                ">=",
                "area",
                80000
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "state-label-lg",
            "paint": {
                "text-color": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "#969696"
                        ],
                        [
                            20,
                            "#969696"
                        ]
                    ]
                }
            },
            "source-layer": "state_label"
        },
        {

            "minzoom": 1,
            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-max-width": 7,
                "text-size": {
                    "stops": [
                        [
                            3,
                            8
                        ],
                        [
                            9,
                            18
                        ]
                    ],
                    "base": 0.9
                }
            },
            "maxzoom": 10,
            "filter": [
                ">=",
                "scalerank",
                5
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "country-label-sm",
            "paint": {
                "text-color": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "#444"
                        ],
                        [
                            10,
                            "#888"
                        ]
                    ]
                },
                "text-halo-color": "#000",
                "text-halo-width": 1,
                "text-halo-blur": 1
            },
            "source-layer": "country_label"
        },
        {

            "minzoom": 1,
            "layout": {
                "text-field": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "{code}"
                        ],
                        [
                            2,
                            "{name_en}"
                        ]
                    ]
                },
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-max-width": 7,
                "text-size": {
                    "stops": [
                        [
                            2,
                            8
                        ],
                        [
                            7,
                            18
                        ]
                    ],
                    "base": 0.9
                }
            },
            "maxzoom": 8,
            "filter": [
                "in",
                "scalerank",
                3,
                4
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "country-label-md",
            "paint": {
                "text-color": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "#444"
                        ],
                        [
                            10,
                            "#888"
                        ]
                    ]
                },
                "text-halo-color": "#000",
                "text-halo-width": 1,
                "text-halo-blur": 1
            },
            "source-layer": "country_label"
        },
        {
            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-max-width": 6,
                "text-size": {
                    "stops": [
                        [
                            1,
                            9
                        ],
                        [
                            5,
                            18
                        ]
                    ],
                    "base": 0.9
                }
            },
            "maxzoom": 12,
            "filter": [
                "in",
                "scalerank",
                1,
                2
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "country-label-lg",
            "paint": {
                "text-color": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "#666"
                        ],
                        [
                            10,
                            "#999"
                        ]
                    ]
                },
                "text-halo-color": "#000",
                "text-halo-width": 1,
                "text-halo-blur": 1
            },
            "source-layer": "country_label"
        }
    ],

}