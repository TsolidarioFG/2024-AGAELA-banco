import AdminButtons from "./AdminButtons";
import UserButtons from "./UserButtons";
import NoUserButtons from "./NoUserButtons";

const Home = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/logoAgaela.png" alt="" style={{ display: 'block', margin: 'auto', width: '250px', height: 'auto', marginBottom: '100px', marginTop: '90px' }} />
        <div><UserButtons/></div>
        <div><AdminButtons/></div>
        <div><NoUserButtons/></div>
    </div>
);

export default Home;
