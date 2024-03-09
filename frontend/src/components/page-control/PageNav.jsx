import { useMenu } from "../../context/MenuProvider";
import { usePage } from "../../context/PageProvider";
import { useUser } from "../../context/UserProvider";

import { LiaHomeSolid, LiaListOlSolid, LiaImage, LiaComments } from "react-icons/lia";

/**
 * Renders the navigation bar for the page.
 * @returns {JSX.Element} The navigation bar component.
 */
export default function PageNav() {
    const { currentUserPageName, changeUserPage } = usePage();
    const { toggleMenu } = useMenu();
    const { userIdExists } = useUser();

    /**
     * Changes the current page and toggles the menu.
     * @param {string} page - The name of the page to navigate to.
     */
    const changePage = (page) => {
        if(page !== currentUserPageName){
            changeUserPage(page);
        }
        toggleMenu();
    }

    let homeBtn = (
        <button className="nav-btn home-button" onClick={() => changePage('home')}>
            <LiaHomeSolid />
        </button>
    )
    let leaderBoardBtn = (
        <button className="nav-btn leaderboard-button" onClick={() => changePage('leaderboard')}>
            <LiaListOlSolid />
        </button>
    )
    let galleryBtn = userIdExists ? (
        <button className="nav-btn gallery-button" onClick={() => changePage('gallery')}>
            <LiaImage />
        </button>
    ) : null;
    let chatBtn = userIdExists ? (
        <button className="nav-btn chat-button" onClick={() => changePage('chat')}>
            <LiaComments />
        </button>
    ) : null;
    
    return (
        <div className='page__navigation'>
            {homeBtn}
            {leaderBoardBtn}
            {galleryBtn}
            {chatBtn}
        </div>
    )
}