
export const LinkCard = ({url, fetchUrls}) => {

    return (
        <div>
            <img src={url?.qr} alt="qr code" />
        </div>
    );
}