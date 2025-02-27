import { Pipelines } from '../../db/models';
import { IBoardDocument } from '../../db/models/definitions/boards';
import { IContext } from '../types';

export default {
  pipelines(board: IBoardDocument, {}, { user }: IContext) {
    if (board.pipelines) {
      return board.pipelines;
    }

    if (user.isOwner) {
      return Pipelines.find({
        boardId: board._id,
        status: { $ne: 'archived' }
      }).lean();
    }

    return Pipelines.find({
      $and: [
        { status: { $ne: 'archived' } },
        { boardId: board._id },
        {
          $or: [
            { visibility: 'public' },
            {
              visibility: 'private',
              $or: [{ memberIds: user._id }, { userId: user._id }]
            }
          ]
        }
      ]
    }).lean();
  }
};
