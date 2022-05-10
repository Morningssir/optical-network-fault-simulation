import request from '@/utils/request';

export async function planningProject(payload) {
  const { projectId } = payload;
  return request(`planning/projects/${projectId}`, {
    method: 'POST',
  });
}

export async function queryPlanningService(payload) {
  const { projectId, serviceId } = payload;
  return request(`planning/projects/${projectId}/services/${serviceId}`);
}

export async function queryPlanningLink(payload) {
  const { projectId, linkId } = payload;
  return request(`planning/projects/${projectId}/links/${linkId}`);
}
