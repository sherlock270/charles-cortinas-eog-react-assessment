import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchFetchDroneData(action) {
  const { error, data } = yield call(API.getDroneData);

  if (error) {
    console.log({ error });
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }

  yield put({ type: actions.DRONE_DATA_RECEIVED, data: data });
}

function* watchDroneDataRecieved(action) {
  let droneData = action.data.data;
  yield put({
    type: actions.FETCH_WEATHER,
    latitude: droneData[droneData.length - 1].latitude,
    longitude: droneData[droneData.length - 1].longitude
  });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_DRONE_DATA, watchFetchDroneData),
    takeEvery(actions.DRONE_DATA_RECEIVED, watchDroneDataRecieved)
  ]);
}

export default [watchAppLoad];
