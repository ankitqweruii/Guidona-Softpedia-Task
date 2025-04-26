const db = require('../utils/db');
const Paginator = require('../utils/paginator');

const getBranches = async (req, res) => {
  try {
    const { searchBy, searchValue, sortBy, sortOrder = 'asc', page = 1, limit = 10 } = req.query;
    
    const paginator = new Paginator(page, limit);
    
    let baseQuery = 'SELECT * FROM branches';
    let countQuery = 'SELECT COUNT(*) as total FROM branches';
    let whereClause = '';
    let queryParams = [];
    
    if (searchBy && searchValue) {
      const validColumns = ['branchCode', 'branchName', 'branchCity', 'branchState', 'branchAddress'];
      
      if (!validColumns.includes(searchBy)) {
        return res.status(400).json({ 
          error: `Invalid searchBy parameter. Valid options: ${validColumns.join(', ')}` 
        });
      }
      
      whereClause = ` WHERE ${searchBy} LIKE ?`;
      queryParams.push(`%${searchValue}%`);
    }
    
    if (whereClause) {
      baseQuery += whereClause;
      countQuery += whereClause;
    }
    
    if (sortBy) {
      const validColumns = ['id', 'branchCode', 'branchName', 'branchCity', 'branchState', 
                            'branchAddress', 'latitude', 'longitude'];
      
      if (!validColumns.includes(sortBy)) {
        return res.status(400).json({ 
          error: `Invalid sortBy parameter. Valid options: ${validColumns.join(', ')}` 
        });
      }
      
      const order = sortOrder.toLowerCase();
      if (order !== 'asc' && order !== 'desc') {
        return res.status(400).json({ error: 'sortOrder must be either "asc" or "desc"' });
      }
      
      baseQuery += ` ORDER BY ${sortBy} ${order}`;
    } else {
      baseQuery += ' ORDER BY id ASC';
    }
    
    baseQuery += ' LIMIT ? OFFSET ?';
    queryParams.push(paginator.getLimit(), paginator.getOffset());
    
    const [branches, countResult] = await Promise.all([
      db.query(baseQuery, queryParams),
      db.get(countQuery, queryParams.slice(0, queryParams.length - 2))
    ]);
    
    const result = paginator.formatPaginationResponse(branches, countResult.total);
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ error: 'An error occurred while fetching branches' });
  }
};

module.exports = {
  getBranches
};