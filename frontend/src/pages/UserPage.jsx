import Home from "../components/home/Home"
import HamburgerMenu from "../components/menu/HamburgerMenu"
import LeaderBoard from "../components/leaderboard/LeaderBoard"
import PageControls from "../components/page-control/PageControls"
import Gallery from "../components/gallery/Gallery"
import GlobalChat from "../components/chat/GlobalChat"

import ErrorModal from '../components/modal/ErrorModal'

import { usePage } from "../context/PageProvider"
import UserProvider from "../context/UserProvider"
import MenuProvider from "../context/MenuProvider"

/**
 * Renders the UserPage component.
 * @returns {JSX.Element} The rendered UserPage component.
 */
export default function UserPage() {
    const { currentUserPageName, validUserPageNames } = usePage();

    const pageNameMap = {
        'home': Home,
        'leaderboard': LeaderBoard,
        'gallery': Gallery,
        'chat': GlobalChat
    }

    /**
     * Checks if the current device is a mobile device.
     * @returns {boolean} True if the current device is a mobile device, false otherwise.
     */
    const isMobile = () => {
        return window.innerWidth < 600;
    }

    return (
        <>
            {!isMobile() && <ErrorModal
                status='Mobile Device Required!'
                errorMessage='This website was designed for small-width mobile devices. Proceed at your own risk.'
                dismissable={true}
            />}

            <UserProvider>
                <MenuProvider>
                    <PageControls />
                    <section className={`page-carousel in-${currentUserPageName}`}>
                        <HamburgerMenu />
                        {validUserPageNames.map((pageName) => {
                            const PageComponent = pageNameMap[pageName];
                            if (!PageComponent) {
                                return <ErrorModal key={pageName} errorMessage={`No component specified for ${pageName}`} />;
                            }
                            return <PageComponent key={pageName} />;
                        })}
                    </section>
                </MenuProvider>
            </UserProvider>
        </>
    )
}