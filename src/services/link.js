import request from '@/utils/request';

/**
 * 获取链路列表
 * @param {projectId} payload
 * @returns
 */
export async function queryLinks(payload) {
  const { projectId } = payload;
  return request(`/projects/${projectId}/links`);
}

/**
 * 创建链路
 * @param {projectId, params} payload
 * @returns
 */
export async function addLink(payload) {
  const { projectId, ...params } = payload;
  return request(`/projects/${projectId}/links`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除链路
 * @param {projectId, linkId} payload
 * @returns
 */
export async function deleteLink(payload) {
  const { projectId, linkId } = payload;
  return request(`/projects/${projectId}/links/${linkId}`, {
    method: 'DELETE',
  });
}

/**
 * 修改链路
 * @param {projectId, linkId, params} payload
 * @returns
 */
export async function modifyLink(payload) {
  const { projectId, linkId, ...params } = payload;
  return request(`/projects/${projectId}/links/${linkId}`, {
    method: 'PUT',
    data: params,
  });
}
