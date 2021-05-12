import Fetch from '@util/fetch';

const URL = {
    DETAIL: '/api/mosinode/cdm/cli/resource/get',
};

export const getDetail = (param = {}) => Fetch.post(URL.DETAIL, {
    data: param
});

export default {
};
