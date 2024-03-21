import { useUser } from '../../context/UserProvider';
import { handleVotes } from '../../utils/api';
import { LiaHeart, LiaHeartSolid } from "react-icons/lia";

export default function VideoLike({ id, videoVotes, votesInstances }) {
    const { userId, changeVoteId, voteId } = useUser();

    const handleVoteSubmit = async () => {
        try {
            console.log('CURRENT VOTE', voteId)
            console.log('NEW VOTE', id)
            if (voteId !== null && voteId !== id) {
                console.log('DEDUCTING VOTE')
                votesInstances.deductVote(voteId);
            }
            votesInstances.addVote(id);
            changeVoteId(id);
            const response = await handleVotes({ name: userId.name, surname: userId.surname, vote: id, action: "set" });
            console.log('RESPONSE: ', response);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='video__likes'>
            <button onClick={handleVoteSubmit} className='like-btn'>
                {voteId === id ? <LiaHeartSolid /> : <LiaHeart />}
            </button>
            <div className='like-cnt digit'>
                {videoVotes}
            </div>
        </div>
    )
}