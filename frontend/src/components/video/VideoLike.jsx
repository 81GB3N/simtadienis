import { useUser } from '../../context/UserProvider';
import { handleVotes } from '../../utils/api';


export default function VideoLike({ id }) {
    const { userId } = useUser();

    const handleVote = async () => {
        try {
            const response = await handleVotes({ name: userId.name, surname: userId.surname, vote: id, action: "set"});
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <button onClick={handleVote}>
            Like
        </button>
    )
}