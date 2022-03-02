function goToPage(url: string) {
    window.location.href = window.location.href.split("/")[0] + url
}

const idContainerActionMoveable = "ImgTextContainerAction"
const idContainerReactionMoveable = "ImgTextContainerReaction"

export {
    goToPage,
    idContainerActionMoveable,
    idContainerReactionMoveable
}