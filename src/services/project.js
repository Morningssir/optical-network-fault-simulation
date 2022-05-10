import request from '@/utils/request';

/**
 * 获取项目列表
 */
export async function queryProjects() {
  return request(`/projects`);
}

/**
 * 创建项目
 * @param {params} payload
 */
export async function addProject(payload) {
  const { params } = payload;
  return request(`/projects`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除项目
 * @param {projectId} payload
 */
export async function deleteProject(payload) {
  const { projectId } = payload;
  return request(`/projects/${projectId}`, {
    method: 'DELETE',
  });
}
