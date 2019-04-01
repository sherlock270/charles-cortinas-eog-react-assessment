import * as actions from "../actions";

const initialState = {
  loading: false,
  timestamp: 0,
  metric: 0,
  latitude: 0,
  longitude: 0,
  uom: "temperature - fahrenheit",
  accuracy: 0,
  droneData: []
};

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const droneDataReceived = (state, action) => {
  let { timestamp, metric, latitude, longitude, accuracy } = action.data.data[
    action.data.data.length - 1
  ];

  return {
    ...state,
    droneData: action.data.data,
    timestamp,
    metric,
    latitude,
    longitude,
    accuracy
  };
};

const handlers = {
  [actions.FETCH_DRONE_DATA]: startLoading,
  [actions.DRONE_DATA_RECEIVED]: droneDataReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
