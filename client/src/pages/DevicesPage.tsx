
import DeviceBox from '../components/DeviceBox';

export default function DevicesPage() {
    return (
        <>
            {/*Title*/}
            <h1
                style={{
                    marginTop: '10px',
                    textAlign: 'left',
                    fontSize: '32px',
                    color: 'white',
                    padding: "1em 2em 1em 1em"
                }}
            >
                {"Smart Devices"}
            </h1>
            
            {/* Box */}
            <DeviceBox />
        </>
    );
}