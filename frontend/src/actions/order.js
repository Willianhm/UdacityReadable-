export const CHANGE_ORDER = 'CHANGE_FILTER';

export function changeOrder(order) {
  return {
    order,
    type: CHANGE_ORDER
  }
}