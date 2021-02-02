class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1. Build query
    // This is a trick to create shallow copy of an object in ES6
    // ... req.query will destructure the query
    // {} will make it a new object
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObject = { ...this.queryString };

    // 1.1 Basic filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // this will remove elements from excludedFields without creating a new object
    excludedFields.forEach((el) => delete queryObject[el]);

    // 1.2 Advanced filtering: gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObject);
    // /g = exact match | /g = happens more than once
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`
    );
    console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));

    //let query = Tour.find(JSON.parse(queryStr));

    // {difficulty: 'easy', duration { $gte: 5 }}

    // alternative way to use query to filter data
    // const query = await Tour.find()
    //   .where('duration')
    //   .lte(5)
    //   .where('difficulty')
    //   .equal('easy');

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      console.log(`this.queryString: ${this.queryString}`);

      // to sort secondary field
      // sort('price ratingsAverage')
      const sortBy = this.queryString.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      // something like 'name duration price'
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields); // projecting
    } else {
      // - means 'exclude', '-__v' means everything excluding '__v'
      this.query = this.query.select('-__v');
    }

    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // page=2&limit=10
    // query.skip(2).limit(10) || page 1: 1-10, page 2: 11-20
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
