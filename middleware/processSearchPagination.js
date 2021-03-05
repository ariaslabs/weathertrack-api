

const processSearchPagination = (modal) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search =  req.query.search || '';

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        
        const searchPayload = search.trim().toLowerCase()

        let filteredResults = []

        try {
            var docs = await modal.find({}).exec();
            for(let doc of docs) {
                switch(true){
                    case doc.city.substr(0, searchPayload.length).toLowerCase() === searchPayload:
                        filteredResults.push(doc);
                        continue
                    case doc.state.substr(0, searchPayload.length).toLowerCase() === searchPayload:
                        filteredResults.push(doc);
                        continue
                    case doc.state_id.substr(0, searchPayload.length).toLowerCase() === searchPayload:
                        filteredResults.push(doc);
                        continue
                    case doc.county.substr(0, searchPayload.length).toLowerCase().trim() === searchPayload:
                        filteredResults.push(doc);
                        continue
                    case doc.zip_codes.find(item => item == searchPayload) === searchPayload:
                        filteredResults.push(doc);
                        continue
                    default: 
                        continue
                }
            }
        } catch(err) {
            res.sendStatus(500);
            return
        }

        let payload = {
            page: page,
            results: filteredResults.slice(startIndex, endIndex)
        }

        if(endIndex < filteredResults.length) {
            payload.next = {
                page: page + 1,
                limit: limit
            }
        }

        if(startIndex > 0) {
            payload.previous = {
                page: page - 1,
                limit: limit
            }
        }

        res.payload = payload
        next();
    }
}

module.exports = processSearchPagination