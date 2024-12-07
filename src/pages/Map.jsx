

export default function Map(){
    // const googleMapsLink = "https://www.google.com/maps?q=JC22+QW7,+Noida,+Uttar+Pradesh";
    const googleMapsLink = "https://www.google.com/maps?q=28.6019277,77.402199";

    return(
        <>
        <h1>Map</h1>
        <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '5px'
                }}
            >Map</a>
        </>
    )
}