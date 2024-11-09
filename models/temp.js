[
    {
      '$match': {
        'product': new ObjectId('672f32b97c2d9cd0ab1485ac')
      }
    }, {
      '$group': {
        '_id': null, 
        'averageRating': {
          '$avg': '$rating'
        }, 
        'numberOfReviews': {
          '$sum': 1
        }
      }
    }
  ]