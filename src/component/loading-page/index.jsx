import React from 'react';
class LoadingPage extends React.PureComponent {
    render() {
      return (
        <div className="m-loading_page">
          <div className='content'>
            {isError ? 
              <div className="error">
                <i></i>
                <div className="desc">
                  <section>oops~</section>
                  <section className="secondary">未加载出来，请退出再次尝试</section>
                </div>
              </div> : <div></div>}
          </div>
        </div>
      )
    }
}

export default LoadingPage;
