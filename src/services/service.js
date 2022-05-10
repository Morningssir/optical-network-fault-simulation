import request from '@/utils/request';

/**
 * 获取业务列表
 * @param {projectId} payload
 * @returns
 */
export async function queryServices(payload) {
  const { projectId } = payload;
  return request(`/projects/${projectId}/services`);
}

/**
 * 创建业务
 * @param {projectId, params} payload
 * @returns
 */
export async function addService(payload) {
  const { projectId, ...params } = payload;
  return request(`/projects/${projectId}/services`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除业务
 * @param {projectId, serviceId} payload
 * @returns
 */
export async function deleteService(payload) {
  const { projectId, serviceId } = payload;
  return request(`/projects/${projectId}/services/${serviceId}`, {
    method: 'DELETE',
  });
}

/**
 * 修改业务
 * @param {projectId, serviceId, params} payload
 * @returns
 */
export async function modifyService(payload) {
  const { projectId, serviceId, ...params } = payload;
  return request(`/projects/${projectId}/services/${serviceId}`, {
    method: 'PUT',
    data: params,
  });
}
