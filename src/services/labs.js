import axios from 'axios'


// currently using proxy
// const baseUrl = ""

export const labService = (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const getPage = async (page, limit, search) => {
        try {
            var result = await axios.get(`/api/v1/client/paged/${page}/${limit}?search=${search}`, config);
            return {
                count: result.data.totalDocs,
                result: result.data.docs
            }
        } catch (error) {
            console.log('Error:', error.message)
            throw error
        }
    }

    const service = {
        getPage
    }

    return service
}