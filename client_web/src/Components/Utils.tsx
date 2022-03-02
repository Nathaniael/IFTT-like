function goToPage(url: string) {
    window.location.href = window.location.href.split("/")[0] + url
}

const idContainerActionMoveable = "ImgTextContainerAction"
const idContainerReactionMoveable = "ImgTextContainerReaction"

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function randomString(length: number) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export {
    goToPage,
    idContainerActionMoveable,
    idContainerReactionMoveable,
    randomString
}