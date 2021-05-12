import Fetch from '@music/encrypt-fetch';


const fetch = (url, opt = {}) => {
    const defaultOpt = {
        method: 'get',
        noLoading: false,
        noEnc: true
    };
    const nextOpt = {
        ...defaultOpt,
        ...opt
    };

    return Fetch(url, nextOpt).then(ret => ret.json()).then((json) => {
        if (json.code === 200) {
            return json;
        }
        throw json;
    }).catch((err) => {
        throw err;
    });
};

fetch.post = (url, options = {}) => {
    const nextOpt = options;
    nextOpt.method = 'post';
    return fetch(url, nextOpt);
};

export default fetch;
