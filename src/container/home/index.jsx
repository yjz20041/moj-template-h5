import React from 'React';
import { connectByModule } from '@redux/store';

@connectByModule('home', state => ({
    hello: state.home.hello
}))
class Home extends React.PureComponent {
    render() {
        return <div>hello</div>;
    }
}

export default Home;
