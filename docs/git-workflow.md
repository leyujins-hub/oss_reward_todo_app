# Git 협업 방식

## 브랜치 전략
본 프로젝트는 main, develop, feature 브랜치를 사용하여 협업한다.

## 브랜치 구조

- main: 최종 제출 버전 관리
- develop: 개발 내용 통합
- feature/add-task: 과제 추가 기능
- feature/home_recommend: 홈 화면 및 추천 기능
- feature/task_list: 투두리스트 목록 기능
- docs/presentation: 문서 및 발표 자료 정리

## 작업 흐름

1. develop 브랜치를 기준으로 기능별 브랜치를 생성한다.
2. 각 팀원은 자신의 담당 기능을 작업한다.
3. 작업 내용을 의미 있는 단위로 커밋한다.
4. GitHub에 push한다.
5. Pull Request를 생성한다.
6. develop 브랜치에 병합한다.
7. 최종 작업 완료 후 develop 브랜치를 main에 병합한다.
8. 최종 제출 버전에 v1.0.0 태그를 추가한다.

## 커밋 메시지 규칙

- feat: 새로운 기능 추가
- fix: 오류 수정
- style: UI, 색상, 레이아웃 등 디자인 수정
- docs: 문서 작성 및 수정

## 커밋 메시지 예시

- feat: 과제 추가 화면 구현
- feat: 오늘의 추천 카드 구현
- fix: 완료율 계산 오류 수정
- style: 카드 색상 수정
- docs: README 프로젝트 설명 추가

## Pull Request 규칙

Pull Request는 각 기능 브랜치에서 develop 브랜치로 생성한다.

예시:

- feature/add-task → develop
- feature/home_recommend → develop
- feature/task_list → develop
- docs/presentation → develop

main 브랜치는 최종 제출 직전에만 병합한다.