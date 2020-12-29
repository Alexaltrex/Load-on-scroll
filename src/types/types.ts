export type CharacterType = {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: OriginType
    location: OriginType
    image: string
    episode: Array<string>
    url: string
    created: string
}

type OriginType = {
    name: string
    url: string
}

export type InfoType = {
    count: number
    pages: number
    prev: string | null
    next: string | null
}

export type CharactersDataType = {
    info: InfoType
    results: Array<CharacterType>
}

