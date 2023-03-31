import {AppError} from '../../app-errors';

import LikesRepository from './repository';

const likesRepository = new LikesRepository();

class LikesUseCases {
  static async getLikes({
    filter,
    sort,
    page,
  }: {
    include?: Include;
    fields?: Fields;
    sort?: Sort;
    page?: Page;
    filter?: Filter<Like>;
  }) {
    const likes = await likesRepository.findLikes({filter, sort, page});
    if (!likes) throw AppError.NoContent('NoContent: no likes');

    return likes;
  }

  static async createLike(like: Partial<Like>) {
    const findedLikes = await likesRepository.findLikes({filter: like});
    if (findedLikes[0]) {
      const res = await likesRepository.deleteLike(findedLikes[0].likeId);
      return res;
    }

    const newLike = await likesRepository.createLike(like);
    if (!newLike) {
      throw AppError.InternalError('can`t save like to database');
    }

    return newLike;
  }
}

export default LikesUseCases;
