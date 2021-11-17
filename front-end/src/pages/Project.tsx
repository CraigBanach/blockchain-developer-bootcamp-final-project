import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

function Project({
    match: { params: { id }},
}: Props) {
    return (
        <h2>Project</h2>
    );
}

export default Project;