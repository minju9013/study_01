const VISITOR_ID_KEY = "fp_visitor_id";

/**
 * 인증 연동 전 임시 방문자 식별자.
 * localStorage에 저장된 랜덤 UUID로, 같은 브라우저에서만 유지된다.
 */
export function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}
