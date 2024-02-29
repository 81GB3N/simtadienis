import { useSubPage } from "../../context/SubPageProvider";

// a collection of icons from Icons8 Line Awesome
import { LiaHomeSolid, LiaListOlSolid, LiaImage, LiaComments } from "react-icons/lia";

export default function PageNav({ userExists }) {
    const { userSubPageName, changeUserSubPage, toggleMenu } = useSubPage();

    const changePage = (page) => {
        if(page !== userSubPageName){
            changeUserSubPage(page);
        }
        toggleMenu();
    }

    // button for navigating to and from the home page
    // let homeBtn;
    // if (userSubPageName !== 'home') {
    //     homeBtn =
    //         <button className="nav-btn home-button" onClick={() => changePage('home')}>
    //             <FontAwesomeIcon icon={faHouseUser} />
    //         </button>
    // } else {
    //     homeBtn = null;
    // }

    // button for navigating to and from the leaderboard page
    // let leaderBoardBtn;
    // if (userSubPageName !== 'leaderboard') {
    //     leaderBoardBtn =
    //         <button className="nav-btn leaderboard-button" onClick={() => changePage('leaderboard')}>
    //             <FontAwesomeIcon icon={faListOl} />
    //         </button>
    // } else {
    //     leaderBoardBtn = null;
    // }

    // button for navigating to and from the gallery page
    // let galleryBtn;
    // if (userExists && userSubPageName !== 'gallery') {
    //     galleryBtn =
    //         <button className="nav-btn gallery-button" onClick={() => changePage('gallery')}>
    //             <FontAwesomeIcon icon={faImages} />
    //         </button>
    // } else {
    //     galleryBtn = null;
    // }

    // let chatBtn;
    // if (userExists && userSubPageName !== 'chat') {
    //     chatBtn =
    //         <button className="nav-btn chat-button" onClick={() => changePage('chat')}>
    //             <FontAwesomeIcon icon={faCommentDots} />
    //         </button>
    // } else {
    //     chatBtn = null;
    // }

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
    let galleryBtn = userExists ? (
        <button className="nav-btn gallery-button" onClick={() => changePage('gallery')}>
            <LiaImage />
        </button>
    ) : null;
    let chatBtn = userExists ? (
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