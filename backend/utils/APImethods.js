class APImethods{
  constructor(query, queryString){
    this.query = query
    this.queryString = queryString
  }
  filter(){ 
    const filterQueryObj = {...this.queryString}
    const forbiddenFields = ["sort","fields","page","limit"]
    forbiddenFields.forEach(field=> delete filterQueryObj[field])

    let queryStr = JSON.stringify(filterQueryObj)
    queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match)=>`$${match}`)
    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }
  sort(){
    if(this.queryString.sort){
      const sortBy = this.queryString.sort.split(",").join(" ")
      this.query = this.query.sort(sortBy)
    } else this.query = this.query.sort(`name`) //default sort by price 
    return this
  }
  selectFields(){
    if(this.queryString.fields){
      const fields = this.queryString.fields.split(",").join(" ")
      this.query = this. query.select(fields)
    } else this.query = this. query.select("-__v")
    return this
  }
  makePagination(){
    const page = this.queryString.page || 1
    const perPage = this.queryString.limit || 30
    const skipResults = (page - 1) * perPage
    this.query = this.query.skip(skipResults).limit(perPage)
  }
}

export default APImethods