import React from 'react';

class LoadingErrorPage extends React.PureComponent {
    state = {}

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                timeout: true
            });
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const {
            timeout
        } = this.state;
        return (
            <div className="m-loading_page">
                <div className="content">
                    {timeout
                        && (
                        <div className="error">
                            <i />
                            <div className="desc">
                                <section>oops~</section>
                                <section className="secondary">未加载出来，请退出再次尝试</section>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default LoadingErrorPage;
