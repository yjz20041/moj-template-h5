import React from 'react';

class LoadingErrorPage extends React.PureComponent {
    componentDidMount() {

    }

    render() {
        return (
            <div className="m-loading_page">
                <div className="content">
                    <div className="error">
                        <i />
                        <div className="desc">
                            <section>oops~</section>
                            <section className="secondary">未加载出来，请退出再次尝试</section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoadingErrorPage;
