import MainNavigation from './MainNavigation';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const Layout = (props) => {

    return (
        <>
            <MainNavigation />
            <main>{props.children}</main>
            <NotificationContainer/>
        </>
    );
}

export default Layout;
