import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;

    display: flex;
    flex-direction: column;

    header {
        display: flex;
        align-items: center;
        align-self: center;

        button {
            border: 0;
            background: 0;
        }

        strong {
            font-size: 24px;
            color: #fff;
            margin: 0 15px;
        }
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2 , 1fr);
        grid-gap: 15px;
        margin-top: 30px;
    }
`;

export const Time = styled.li`
    padding: 20px;
    background: #fff;
    border-radius: 4px;

    opacity: ${props => (props.past ? 0.6 : 1)};

    strong {
        display: block;
        color: ${props => (props.available ? '#999' : '#7159c1')};
        font-size:20px;
        font-weight: normal;
    }

    span {
        margin-top: 3px;
        display: block;
        color: ${props => (props.available ? '#999' : '#666')};
    }
`;