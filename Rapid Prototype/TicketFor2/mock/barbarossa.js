export const barbarossaStations = [
    {
        name: "Barbarossaplatz (12, 15)",
        lines: "12, 15",
        coordinates: {
            latitude: 50.929027,
            longitude: 6.941914
        }

    },
    {
        name: "Barbarossaplatz (16, 18)",
        lines: "16, 18",
        coordinates: {
            latitude: 50.92896328137546,
            longitude: 6.943209791154708
        }
    }
]


export const twelveFifteenLines = [
    {
        id: 78645,
        name: "12 (Zollstock Südfriedhof)",
        direction: "Zollstock Südfriedhof",
        stations: ["Eifelstr.", "Eifelplatz", "Pohligstr.", "Herthastr.", "Gottesweg", "Zollstockgürtel", "Zollstock Südfriedhof"]
    },

    {
        id: 78677,
        name: "12 (Merkenich)",
        direction: "Merkenich",
        stations: ["Zülpicher Platz", "Rudolfplatz",
            "Friesenplatz", "Christophstr./Mediapark",
            "Hansaring", "Ebertplatz", "Lohsestr.", "Florastr.",
            "Neusser Str./Gürtel", "Mollwitzstr.", "Scheibenstr.",
            "Wilhelm-Sollmann-Str.", "Niehl",
            "Geestemünder Str.", "Fordwerke Süd",
            "Fordwerke Mitte", "Fordwerke Nord",
            "Merkenich Mitte", "Merkenich"]
    },
    {
        id: 78655,
        name: "15 (Übierring)",
        direction: "Übierring",
        stations: ["Eifelstr.", "Eifelplatz", "Pohligstr.", "Herthastr.", "Gottesweg", "Zollstockgürtel", "Zollstock Südfriedhof"]
    },
    {
        id: 78653,
        name: "15 (Chorweiler)",
        direction: "Chorweiler",
        stations: ["Eifelstr.", "Eifelplatz", "Pohligstr.", "Herthastr.", "Gottesweg", "Zollstockgürtel", "Zollstock Südfriedhof"]
    },
]

export const stationsSearcher = [
    {
        name: "Barbarossaplatz",
        lines: "12, 15",
        coordinates: {
            latitude: 50.929027,
            longitude: 6.941914
        }
    },
]

export const twelveFifteenSearcher = [
    {
        id: 78645,
        name: "12 (Zollstock Südfriedhof)",
        direction: "Zollstock Südfriedhof",
        stations: ["Eifelstr.", "Eifelplatz", "Pohligstr.", "Herthastr.", "Gottesweg", "Zollstockgürtel", "Zollstock Südfriedhof"]
    },
]

export const initialState = {
    latitude: 50.929027,
    longitude: 6.941914,
    latitudeDelta: 0.00375,
    longitudeDelta: 0.00521,
}