# Adaptive Todo App for University Students

## 프로젝트 소개

본 프로젝트는 대학생의 과제, 시험, 팀플 일정 관리를 돕기 위한 적응형 Todo List 웹 애플리케이션입니다.

기존 Todo 앱이 단순히 할 일을 기록하고 완료 여부를 체크하는 데 집중했다면, 본 프로젝트는 사용자의 완료 상태와 마감일 정보를 바탕으로 현재 해야 할 일을 더 직관적으로 확인할 수 있도록 구성하는 것을 목표로 했습니다.

특히 이번 프로젝트의 핵심 개념인 **Adaptiveness**를 반영하기 위해, 사용자의 행동과 일정 상태에 따라 화면 정보가 변화하도록 설계했습니다. 할 일을 완료하면 완료율이 반영되고, 마감일이 가까운 항목은 더 중요하게 인식될 수 있도록 구성하여 단순 기록형 앱이 아닌 상황 반응형 Todo 앱을 지향했습니다.

---

## 프로젝트 목적

대학생은 과제, 시험, 팀 프로젝트, 공지 확인 등 여러 일정을 동시에 관리해야 합니다. 하지만 해야 할 일이 많아질수록 중요한 일을 놓치거나, 마감이 가까운 항목을 늦게 확인하는 문제가 발생할 수 있습니다.

따라서 본 프로젝트는 다음과 같은 목적을 가지고 제작되었습니다.

* 대학생의 일정 및 과제 관리를 돕는 Todo 앱 제작
* 마감일과 완료 상태를 반영한 적응형 기능 구현
* 사용자가 자신의 진행 상황을 직관적으로 확인할 수 있는 UI 구성
* GitHub를 활용한 프로젝트 관리 및 GitHub Pages 배포 경험

---

## Adaptiveness 적용 방식

본 프로젝트에서 Adaptiveness는 사용자의 행동과 일정 상태에 따라 시스템이 반응하는 방식으로 적용되었습니다.

적용 예시는 다음과 같습니다.

* 할 일 완료 여부에 따라 완료율 변화
* 완료 상태에 따른 화면 정보 변화
* 마감일 기반으로 할 일의 우선순위 인식 가능
* 사용자의 작업 진행 상황을 시각적으로 확인할 수 있는 구조
* 캐릭터 성장 및 EXP 요소를 통한 동기 부여

이를 통해 사용자는 단순히 할 일을 입력하는 것에서 끝나는 것이 아니라, 현재 자신의 작업 진행 상태와 우선적으로 확인해야 할 일을 더 쉽게 파악할 수 있습니다.

---

## 주요 기능

* Todo 항목 추가 기능
* Todo 항목 완료 체크 기능
* 완료율 계산 기능
* 마감일 기반 일정 관리 기능
* 학습 및 작업 진행 상태 확인
* 사용자 행동에 따른 시각적 피드백
* 캐릭터 성장 및 EXP 기반 보상 요소
* GitHub Pages를 통한 웹사이트 배포

---

## 사용 기술

* React
* TypeScript
* Vite
* CSS
* Git
* GitHub
* GitHub Pages
* Figma

---

## 개발 과정

본 프로젝트는 다음과 같은 과정으로 진행되었습니다.

1. 대학생 일정 관리 문제 분석
2. Adaptiveness 개념 조사 및 적용 방향 설정
3. Todo 앱 핵심 기능 선정
4. Figma를 활용한 UI 아이디어 구성
5. React와 TypeScript 기반 기능 구현
6. GitHub를 활용한 코드 관리
7. GitHub Pages를 활용한 최종 웹사이트 배포
8. 발표 자료 및 데모 준비

---

## 팀원 역할

| 이름  | 역할                                                         |
| --- | ---------------------------------------------------------- |
| 이유진 | 프로젝트 전체 구조 정리, GitHub 관리, 최종 코드 통합, GitHub Pages 배포, 발표 준비 |
| 김민지 | Figma UI 일부 제작, 아이디어 정리 보조, 일정 조율 참여                       |
| 김도연 | Figma UI 일부 제작, 상태 표시 및 중요도 기능 아이디어 제안                     |
| 안혜원 | Figma UI 일부 제작, 캐릭터 성장 및 EXP 관련 아이디어 제안                    |

---

## Git 활용 방식

프로젝트 개발 과정에서 Git과 GitHub를 활용하여 파일을 관리했습니다.

* 로컬 저장소에서 개발 진행
* GitHub 원격 저장소에 코드 push
* main 브랜치 기준 최종 통합
* 커밋 메시지를 기능 추가, 오류 수정, 스타일 개선, 문서 작성 등으로 구분
* GitHub Pages를 활용해 최종 결과물 배포

커밋 메시지 예시는 다음과 같습니다.

```txt
feat: add todo feature
feat: add deadline based sorting
fix: resolve GitHub Pages white screen
style: improve main page UI
docs: update README
build: update deployment files
release: finalize project for presentation
```

---

## 생성형 AI 활용

본 프로젝트에서는 생성형 AI를 아이디어 정리, 개념 구체화, 오류 해결 보조, 발표 준비 과정에 활용했습니다.

활용한 프롬프트 예시는 다음과 같습니다.

```txt
대학생을 위한 adaptive todo 앱의 핵심 기능을 정리해줘.

Todo 앱에서 adaptiveness를 구현할 수 있는 기능을 추천해줘.

GitHub Pages에서 로컬은 정상 작동하지만 배포 사이트가 흰 화면일 때 원인을 분석해줘.

7분 발표 기준으로 배경, 기능, 개발 과정, 데모, future work 순서의 발표 대본을 작성해줘.
```

이를 통해 Adaptiveness 개념을 Todo 앱 기능과 연결하고, GitHub Pages 배포 과정에서 발생한 오류를 점검하며, 발표 구조를 정리하는 데 도움을 받았습니다.

---

## 실행 방법

프로젝트를 로컬에서 실행하려면 다음 명령어를 사용합니다.

```bash
npm install
npm run dev
```

빌드하려면 다음 명령어를 사용합니다.

```bash
npm run build
```

---

## 배포 방법

본 프로젝트는 GitHub Pages를 통해 배포했습니다.

빌드 결과물을 `docs` 폴더에 반영한 뒤, GitHub Pages 설정에서 `main / docs` 기준으로 배포했습니다.

배포 과정에서 사용한 명령어는 다음과 같습니다.

```bash
rm -rf docs
npm run build
mv dist docs
git add .
git commit -m "release: finalize project for presentation"
git push origin main
```

---

## 배포 링크

아래 링크에서 최종 결과물을 확인할 수 있습니다.

```txt
https://깃허브아이디.github.io/oss_reward_todo_app/
```

※ 실제 제출 전 위 링크를 실제 GitHub Pages 링크로 수정해야 합니다.

---

## 향후 개선 방향

향후에는 다음과 같은 기능을 추가하여 더 실용적인 대학생 맞춤형 Todo 앱으로 확장할 수 있습니다.

* 학교 LMS 및 공지 시스템 연동
* 위치 기반 알림 기능
* 마감 임박 과제 자동 강조 기능
* 사용자 완료 패턴 기반 우선순위 추천
* 팀플 일정 공유 기능
* 모바일 화면 최적화

---

## 프로젝트 의의

본 프로젝트는 단순한 Todo List 구현을 넘어, 사용자의 행동과 일정 상태에 따라 화면 정보가 변화하는 Adaptiveness 개념을 적용했다는 점에서 의미가 있습니다.

또한 GitHub를 활용한 코드 관리와 GitHub Pages 배포 과정을 경험하며, 실제 웹 프로젝트의 개발 및 제출 과정을 학습할 수 있었습니다.
