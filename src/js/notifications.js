import { success, error, info, defaults, notice } from '@pnotify/core';

function noticeError() {
  error({
    title: 'Error',
    text: 'Enter correct value',
  });
}

function noticeInfo() {
  info({
    title: 'Information',
    text: 'There are no more content to show. Enter new query to search',
  });
}

function noticeSuccess() {
  success({
    title: 'Success',
    text: 'The search proceeded successfully',
  });
}

function setDefaultsDelay(delay) {
  defaults.delay = delay;
}

function noticeFetchTrouble() {
  notice({
    title: 'Warning',
    text: 'Something went wrong!',
  });
}

export { noticeError, noticeSuccess, noticeInfo, setDefaultsDelay, noticeFetchTrouble };
