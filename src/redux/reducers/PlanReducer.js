import {SET_PLAN, SET_PLANS, SET_PLACE_DATA, SET_PLAN_DONE_MODAL, SET_PLAN_APPROVE_MODAL, SET_PLAN_DETAILS_DATE, SET_MONTH_PLAN_ID, SET_SELECTED_DATE} from '../actions/ActionTypes';

const initialState = {
  plans: [],
  plan: {},
  placeData: {},
  planDoneModal: false,
  planApproveModal: false,
  planDetailsDate: {},
  monthPlanId: null,
  selectedDate: null,
};

const PlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANS: {
      return {
        ...state,
        plans: [...state.plans, action.plan],
        // plans: state.plans.push(action.plan),
      };
    }
    case SET_PLAN: {
      return {
        ...state,
        plan: action.plan,
        // plans: state.plans.push(action.plan),
      };
    }
    case SET_PLACE_DATA: {
      return {
        ...state,
        placeData: action.placeData,
        // plans: state.plans.push(action.plan),
      };
    }
    case SET_PLAN_DONE_MODAL: {
      return {
        ...state,
        planDoneModal: action.planDoneModal,
        // plans: state.plans.push(action.plan),
      };
    }
    case SET_PLAN_APPROVE_MODAL: {
      return {
        ...state,
        planApproveModal: action.planApproveModal,
        // plans: state.plans.push(action.plan),
      };
    }
    case SET_PLAN_DETAILS_DATE: {
      return {
        ...state,
        planDetailsDate: action.planDetailsDate,
        // plans: state.plans.push(action.plan),
      };
    }
    case SET_MONTH_PLAN_ID: {
      return {
        ...state,
        monthPlanId: action.monthPlanId,
        // plans: state.plans.push(action.plan),
      };
    }
    case SET_SELECTED_DATE: {
      return {
        ...state,
        selectedDate: action.selectedDate,
        // plans: state.plans.push(action.plan),
      };
    }
    default:
      return state;
  }
};
export default PlanReducer;

// Developed by Mustafa Alabadla
