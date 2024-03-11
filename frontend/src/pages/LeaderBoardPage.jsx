import LeaderBoard from '../components/leaderboard/LeaderBoard'

export default function LeaderBoardPage() {
    console.log('LeaderBoardPage')
    return (
        <div className='leaderboard-page'>
            <LeaderBoard desktopMode={true}/>
        </div>
        )
}