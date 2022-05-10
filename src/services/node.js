import request from '@/utils/request';

/**
 * 获取节点列表
 * @param {projectId} payload
 * @returns
 */
export async function queryNodes(payload) {
  const { projectId } = payload;
  return request(`/projects/${projectId}/nodes`);
}

/**
 * 创建节点
 * @param {projectId, params} payload
 * @returns
 */
export async function addNode(payload) {
  const { projectId, ...params } = payload;
  return request(`/projects/${projectId}/nodes`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除节点
 * @param {projectId, nodeId} payload
 * @returns
 */
export async function deleteNode(payload) {
  const { projectId, nodeId } = payload;
  return request(`/projects/${projectId}/nodes/${nodeId}`, {
    method: 'DELETE',
  });
}

/**
 * 修改节点
 * @param {projectId, nodeId, params} payload
 * @returns
 */
export async function modifyNode(payload) {
  const { projectId, nodeId, ...params } = payload;
  return request(`/projects/${projectId}/nodes/${nodeId}`, {
    method: 'PUT',
    data: params,
  });
}
