import api from './api';
import * as types from '../constants/actionTypes';

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = action => api(store)(next)(action);

  return { store, next, invoke };
};

describe('API MIDDLEWARE', () => {
  it('passes through actions without callAPI', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
  });

  it('passes through actions with callAPI with "START" postfix', () => {
    const { next, invoke } = create();
    const action = {
      type: types.LOAD_NEXT_TRACK,
      callAPI: '/tracks',
    };

    invoke(action);

    const expectAction = { type: types.LOAD_NEXT_TRACK + types.START };
    expect(next).toHaveBeenCalledWith(expectAction);
  });
});
