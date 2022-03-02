type ActionReaction = {
    id: number,
    service_id: number
    name: string,
    description: string,
    params: string
};

type ActionReactionConfig = {
    id: number,
    imgUrl: string,
    params: string,
    title: string
};

type Service = {
    id: number,
    logo: string,
    name: string,
    actions: [ActionReaction],
    reactions: [ActionReaction]
};

export type {
    Service,
    ActionReaction,
    ActionReactionConfig
};