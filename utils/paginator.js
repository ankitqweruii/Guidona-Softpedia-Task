class Paginator {
    constructor(page = 1, limit = 10) {
      this.page = parseInt(page, 10) || 1;
      this.limit = parseInt(limit, 10) || 10;
      
      if (this.page < 1) this.page = 1;
      
      if (this.limit < 1) this.limit = 10;
      if (this.limit > 100) this.limit = 100;
    }
  
    getOffset() {
      return (this.page - 1) * this.limit;
    }
  
    getLimit() {
      return this.limit;
    }
  
    formatPaginationResponse(data, totalItems) {
      const totalPages = Math.ceil(totalItems / this.limit);
      
      return {
        data: data,
        pagination: {
          total: totalItems,
          page: this.page,
          limit: this.limit,
          totalPages: totalPages,
          hasNextPage: this.page < totalPages,
          hasPrevPage: this.page > 1
        }
      };
    }
  }
  
  module.exports = Paginator;