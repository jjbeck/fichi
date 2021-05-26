import { gql, useMutation } from '@apollo/client';

const CREATEUSER = gql`
mutation 
  signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
}`;

function AddTodo() {
    
    const [createUser, { data }] = useMutation(CREATEUSER);
    return {createUser, data}
}

export default AddTodo;