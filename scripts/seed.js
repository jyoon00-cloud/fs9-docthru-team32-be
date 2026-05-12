import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
  console.log('🌱 시딩 작업을 시작합니다...');

  // 1. 기존 데이터 초기화
  await prisma.notification.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.work.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.challengeApplication.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ 기존 데이터를 삭제했습니다.');

  // 2. 비밀번호 해싱
  const hashedPassword = await bcrypt.hash('password1234', SALT_ROUNDS);

  // 3. 유저 생성 (User) - 총 7명
  const _adminUser = await prisma.user.create({
    data: {
      email: 'admin@docthru.com',
      nickname: '관리자',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const proUser1 = await prisma.user.create({
    data: {
      email: 'pro1@docthru.com',
      nickname: '번역장인1',
      password: hashedPassword,
      role: 'PRO',
    },
  });
  const proUser2 = await prisma.user.create({
    data: {
      email: 'pro2@docthru.com',
      nickname: '번역장인2',
      password: hashedPassword,
      role: 'PRO',
    },
  });

  const normalUser1 = await prisma.user.create({
    data: {
      email: 'user1@docthru.com',
      nickname: '열정코더1',
      password: hashedPassword,
      role: 'NORMAL',
    },
  });
  const normalUser2 = await prisma.user.create({
    data: {
      email: 'user2@docthru.com',
      nickname: '열정코더2',
      password: hashedPassword,
      role: 'NORMAL',
    },
  });
  const normalUser3 = await prisma.user.create({
    data: {
      email: 'user3@docthru.com',
      nickname: '공부중3',
      password: hashedPassword,
      role: 'NORMAL',
    },
  });
  const normalUser4 = await prisma.user.create({
    data: {
      email: 'user4@docthru.com',
      nickname: '공부중4',
      password: hashedPassword,
      role: 'NORMAL',
    },
  });
  // 추가 유저 생성 (총 12명)
  const proUser3 = await prisma.user.create({
    data: {
      email: 'pro3@docthru.com',
      nickname: '코딩곰돌이',
      password: hashedPassword,
      role: 'PRO',
    },
  });
  const normalUser5 = await prisma.user.create({
    data: {
      email: 'user5@docthru.com',
      nickname: '프론트엔드천재',
      password: hashedPassword,
      role: 'NORMAL',
    },
  });
  const normalUser6 = await prisma.user.create({
    data: {
      email: 'user6@docthru.com',
      nickname: '백엔드마스터',
      password: hashedPassword,
      role: 'NORMAL',
    },
  });
  const normalUser7 = await prisma.user.create({
    data: {
      email: 'user7@docthru.com',
      nickname: 'AI연구원',
      password: hashedPassword,
      role: 'NORMAL',
    },
  });
  const normalUser8 = await prisma.user.create({
    data: {
      email: 'user8@docthru.com',
      nickname: '데이터사이언티스트',
      password: hashedPassword,
      role: 'NORMAL',
    },
  });

  console.log('✅ 유저 생성 완료');

  // 4. 챌린지 신청서 생성 (ChallengeApplication)

  // 4-1. [NEW] 반려된 신청서 (REJECTED)
  await prisma.challengeApplication.create({
    data: {
      creatorId: normalUser3.id,
      title: '개인 일기장 번역하기', // 부적절한 주제 예시
      category: 'Career',
      documentType: 'Blog',
      originalLink: 'https://personal-blog.com/diary/1',
      description: '제 일기를 영어로 번역하고 싶습니다.',
      maxParticipants: 1,
      deadlineAt: new Date(new Date().setDate(new Date().getDate() + 7)),
      status: 'REJECTED', // 반려 상태
      reviewedAt: new Date(),
      adminFeedback: '공적인 기술 문서나 블로그가 아니므로 반려합니다.', // 관리자 피드백
    },
  });

  // 4-2. 승인 대기 중인 신청서 (2개)
  await prisma.challengeApplication.createMany({
    data: [
      {
        creatorId: normalUser1.id,
        title: 'React 19 공식문서 번역 챌린지',
        category: 'Web',
        documentType: 'Official',
        originalLink:
          'https://react.dev/blog/2024/04/25/react-19-upgrade-guide',
        description:
          'React 19 변경점에 대해 같이 번역하며 공부하실 분 모집합니다.',
        maxParticipants: 5,
        deadlineAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        status: 'PENDING',
      },
      {
        creatorId: normalUser2.id,
        title: 'Vue.js 3 Composition API 정복',
        category: 'Modern JS',
        documentType: 'Official',
        originalLink: 'https://vuejs.org/guide/introduction.html',
        description: 'Vue 3의 새로운 문법을 완벽하게 이해해봅시다.',
        maxParticipants: 4,
        deadlineAt: new Date(new Date().setDate(new Date().getDate() + 10)),
        status: 'PENDING',
      },
    ],
  });
await prisma.challengeApplication.createMany({
  data: [
    {
      creatorId: normalUser5.id,
      title: 'Python 3.12 새로운 기능 번역',
      category: 'Python',
      documentType: 'Official',
      originalLink: 'https://docs.python.org/3/whatsnew/3.12.html',
      description: 'Python 3.12 주요 변화와 새로운 표준 라이브러리를 번역합니다.',
      maxParticipants: 4,
      deadlineAt: new Date(new Date().setDate(new Date().getDate() + 14)),
      status: 'PENDING',
    },
    {
      creatorId: normalUser6.id,
      title: 'AI Ethics 가이드 번역',
      category: 'AI',
      documentType: 'Official',
      originalLink: 'https://ai.google/education/ethics.html',
      description: 'AI 윤리 가이드라인을 한국어로 번역합니다.',
      maxParticipants: 3,
      deadlineAt: new Date(new Date().setDate(new Date().getDate() + 10)),
      status: 'PENDING',
    },
    {
      creatorId: proUser3.id,
      title: 'Next.js 14 최신 기능 탐구',
      category: 'Next',
      documentType: 'Official',
      originalLink: 'https://nextjs.org/docs/upgrading',
      description: 'Next.js 14의 새로운 라우팅·데이터 페칭 기능을 번역합니다.',
      maxParticipants: 5,
      deadlineAt: new Date(new Date().setDate(new Date().getDate() + 12)),
      status: 'PENDING',
    },
  ],
});

  // 4-3. 승인 완료된 신청서 (2개)
  // [MODIFIED] 첫 번째 신청서는 마감된 챌린지용 (마감일을 어제로 설정)
  const approvedApp1 = await prisma.challengeApplication.create({
    data: {
      creatorId: proUser1.id,
      title: 'Next.js App Router 딥다이브',
      category: 'Next',
      documentType: 'Blog',
      originalLink:
        'https://nextjs.org/docs/app/building-your-application/routing',
      description: 'App Router의 핵심 개념을 완벽하게 번역하고 정리합니다.',
      maxParticipants: 3,
      deadlineAt: new Date(new Date().setDate(new Date().getDate() - 1)), // 어제 마감됨
      status: 'APPROVED',
      reviewedAt: new Date(new Date().setDate(new Date().getDate() - 5)), // 5일 전 승인
    },
  });

  const approvedApp2 = await prisma.challengeApplication.create({
    data: {
      creatorId: proUser2.id,
      title: 'TypeScript 5.0 핸드북 스터디',
      category: 'Web',
      documentType: 'Official',
      originalLink:
        'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html',
      description: '타입스크립트 5.0의 데코레이터와 새로운 기능을 번역합니다.',
      maxParticipants: 5,
      deadlineAt: new Date(new Date().setDate(new Date().getDate() + 20)),
      status: 'APPROVED',
      reviewedAt: new Date(),
    },
  });

  console.log('✅ 챌린지 신청서 생성 완료 (반려: 1, 대기: 2, 승인: 2)');

  // 5. 챌린지 생성 (Challenge)
  // [MODIFIED] challenge1을 마감(CLOSED) 상태로 설정
  const challenge1 = await prisma.challenge.create({
    data: {
      applicationId: approvedApp1.id,
      creatorId: proUser1.id,
      title: approvedApp1.title,
      category: approvedApp1.category,
      documentType: approvedApp1.documentType,
      originalLink: approvedApp1.originalLink,
      description: approvedApp1.description,
      maxParticipants: approvedApp1.maxParticipants,
      deadlineAt: approvedApp1.deadlineAt, // 어제 날짜
      status: 'CLOSED', // 마감 상태
    },
  });

  const challenge2 = await prisma.challenge.create({
    data: {
      applicationId: approvedApp2.id,
      creatorId: proUser2.id,
      title: approvedApp2.title,
      category: approvedApp2.category,
      documentType: approvedApp2.documentType,
      originalLink: approvedApp2.originalLink,
      description: approvedApp2.description,
      maxParticipants: approvedApp2.maxParticipants,
      deadlineAt: approvedApp2.deadlineAt,
      status: 'RECRUITING', // 모집 중 상태
    },
  });
const approvedApp3 = await prisma.challengeApplication.create({
    data: {
      creatorId: proUser3.id,
      title: 'Python 3.12 새로운 기능 번역 챌린지',
      category: 'Python',
      documentType: 'Official',
      originalLink: 'https://docs.python.org/3/whatsnew/3.12.html',
      description: 'Python 3.12 주요 변화를 번역합니다.',
      maxParticipants: 4,
      deadlineAt: new Date(new Date().setDate(new Date().getDate() + 14)),
      status: 'APPROVED',
      reviewedAt: new Date(),
    },
  });

  const approvedApp4 = await prisma.challengeApplication.create({
    data: {
      creatorId: normalUser6.id,
      title: 'AI Ethics 가이드 번역 챌린지',
      category: 'AI',
      documentType: 'Official',
      originalLink: 'https://ai.google/education/ethics.html',
      description: 'AI 윤리 가이드라인을 번역합니다.',
      maxParticipants: 3,
      deadlineAt: new Date(new Date().setDate(new Date().getDate() + 20)),
      status: 'APPROVED',
      reviewedAt: new Date(),
    },
  });

const challenge3 = await prisma.challenge.create({
  data: {
    applicationId: approvedApp3.id,
    creatorId: proUser3.id,
    title: approvedApp3.title,
    category: approvedApp3.category,
    documentType: approvedApp3.documentType,
    originalLink: approvedApp3.originalLink,
    description: approvedApp3.description,
    maxParticipants: approvedApp3.maxParticipants,
    deadlineAt: approvedApp3.deadlineAt,
    status: 'RECRUITING',
  },
});
const challenge4 = await prisma.challenge.create({
  data: {
    applicationId: approvedApp4.id,
    creatorId: proUser2.id,
    title: approvedApp4.title,
    category: approvedApp4.category,
    documentType: approvedApp4.documentType,
    originalLink: approvedApp4.originalLink,
    description: approvedApp4.description,
    maxParticipants: approvedApp4.maxParticipants,
    deadlineAt: approvedApp4.deadlineAt,
    status: 'RECRUITING',
  },
});

  console.log('✅ 챌린지 2개 생성 완료 (마감: 1, 모집중: 1)');

  // 6. 작업물 제출 (Work)
  const work1 = await prisma.work.create({
    data: {
      challengeId: challenge1.id,
      workerId: normalUser1.id,
      content: `## Next.js 라우팅: 정의 및 기초

Next.js는 파일 시스템 기반 라우터를 사용합니다. 이는 폴더를 사용하여 라우트를 정의한다는 의미입니다.

### 파일 및 폴더의 역할
- **폴더**는 라우트를 정의하는 데 사용됩니다. 라우트는 파일 시스템 계층 구조를 따라 루트 폴더에서 \`page.js\` 파일을 포함하는 최종 하위 폴더까지의 단일 경로입니다.
- **파일**은 라우트 세그먼트에 대한 UI를 생성하는 데 사용됩니다.

### 라우트 세그먼트
파일 시스템의 각 폴더는 **라우트 세그먼트**를 나타냅니다. 각 라우트 세그먼트는 **URL 경로**의 상응하는 세그먼트에 매핑됩니다.

### 중첩된 라우트
중첩된 라우트를 만들려면 폴더를 서로 중첩하면 됩니다. 예를 들어, \`app/dashboard/settings/page.js\` 파일은 \`/dashboard/settings\` URL 경로에 매핑됩니다.`,
      likeCount: 2,
      isSelected: true, //마감된 챌린지의 1등 작업물
    },
  });

  const work2 = await prisma.work.create({
    data: {
      challengeId: challenge1.id,
      workerId: normalUser2.id,
      content: `## 페이지와 레이아웃 (Pages and Layouts)

App Router 내부의 특수 파일 계층 구조를 통해 라우트별 UI를 쉽게 정의할 수 있습니다.

### 페이지 (Pages)
페이지는 라우트의 고유한 UI입니다. \`page.js\` 파일에서 컴포넌트를 내보내어 페이지를 정의할 수 있습니다.

\`\`\`jsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
\`\`\`

### 레이아웃 (Layouts)
레이아웃은 여러 페이지 간에 공유되는 UI입니다. 탐색 시 레이아웃은 상태를 유지하고 대화형을 유지하며 다시 렌더링되지 않습니다. 레이아웃은 중첩될 수도 있습니다.

상위 레이아웃은 \`children\` prop을 통해 하위 레이아웃이나 페이지를 받아 렌더링합니다.`,
      likeCount: 1,
    },
  });

  const work3 = await prisma.work.create({
    data: {
      challengeId: challenge2.id,
      workerId: normalUser3.id,
      content: `## TypeScript 5.0: 데코레이터 (Decorators)

TypeScript 5.0에서는 오랫동안 기다려온 새로운 데코레이터 표준이 지원됩니다.

### 클래스 데코레이터
새로운 데코레이터 제안은 이전의 실험적(experimental) 데코레이터와는 구조가 다릅니다. 이제 데코레이터는 함수로 정의되며, 타겟과 컨텍스트 객체를 인자로 받습니다.

\`\`\`typescript
function loggedMethod(target: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);
    function replacementMethod(this: any, ...args: any[]) {
        console.log(\`LOG: Entering method '\${methodName}'.\`);
        return target.call(this, ...args);
    }
    return replacementMethod;
}
\`\`\`

이 방식은 런타임 오버헤드를 줄이고 정적 분석을 더 용이하게 만듭니다.`,
      likeCount: 1,
    },
  });

  const _work4 = await prisma.work.create({
    data: {
      challengeId: challenge2.id,
      workerId: normalUser4.id,
      content: `## Const 타입 파라미터 (Const Type Parameters)

함수를 호출할 때 TypeScript는 보통 더 일반적인 타입을 추론합니다. 예를 들어, 배열 리터럴은 가변적인 배열로 추론됩니다.

TypeScript 5.0에서는 타입 파라미터 선언 앞에 \`const\`를 추가하여 \`as const\`와 유사한 효과를 낼 수 있습니다.

\`\`\`typescript
type HasNames = { readonly names: readonly string[] };

function getNamesExactly<const T extends HasNames>(arg: T): T["names"] {
    return arg.names;
}

// 추론된 타입: readonly ["Alice", "Bob", "Eve"]
const names = getNamesExactly({ names: ["Alice", "Bob", "Eve"] });
\`\`\`

이를 통해 불필요한 타입 단언을 줄이고 더 정확한 추론이 가능해졌습니다.`,
      likeCount: 0,
    },
  });

  const work5 = await prisma.work.create({
    data: {
      challengeId: challenge3.id,
      workerId: normalUser5.id,
      content: `## Python 3.12: 새로운 기능 요약

### f-string 구문 개선
f-string 내부에 인용부호를 재사용할 수 있으며, 여러 줄 표현식과 백슬래시 사용이 가능해졌습니다.

\`\`\`python
# 이제 이런 표현이 가능합니다.
print(f"This is a list: {', '.join(['apple', 'banana', 'cherry'])}")
\`\`\`

### 타입 파라미터 구문 (PEP 695)
제네릭 클래스와 함수를 위한 더 깔끔한 구문이 도입되었습니다.

\`\`\`python
def max[T](args: Iterable[T]) -> T:
    ...
\`\`\`

### 성능 향상
인터프리터 레벨에서의 다양한 최적화를 통해 전반적인 실행 속도가 약 5% 향상되었습니다.`,
      likeCount: 2,
      isSelected: false,
    },
  });

  const work6 = await prisma.work.create({
    data: {
      challengeId: challenge4.id,
      workerId: normalUser6.id,
      content: `## 구글 AI 윤리 가이드라인 (AI Ethics Principles)

인공지능은 사회에 큰 이익을 줄 수 있는 잠재력을 가지고 있지만, 동시에 책임감 있는 개발이 필요합니다. 구글이 준수하는 7가지 원칙은 다음과 같습니다.

1. **사회적으로 유익할 것 (Be socially beneficial)**: 경제, 보건 등 광범위한 분야에서 긍정적인 영향을 목표로 합니다.
2. **불공정한 편향을 만들거나 강화하지 않을 것 (Avoid creating or reinforcing unfair bias)**: 인종, 성별, 정치적 견해 등에 따른 차별을 방지합니다.
3. **안전을 위해 구축되고 테스트될 것 (Be built and tested for safety)**: 예기치 않은 위험을 방지하기 위해 엄격한 안전 제어 시스템을 적용합니다.
4. **사람들에게 책임감을 가질 것 (Be accountable to people)**: 사용자의 피드백을 수용하고 통제권을 부여합니다.
5. **개인정보 보호 설계를 통합할 것 (Incorporate privacy design principles)**: 데이터 수집 및 사용 시 프라이버시를 최우선으로 고려합니다.
6. **과학적 우수성의 높은 표준을 유지할 것 (Uphold high standards of scientific excellence)**: 개방적인 학술 교류와 엄격한 과학적 방법론을 따릅니다.
7. **이러한 원칙과 일치하는 용도로 사용될 것 (Be made available for uses that accord with these principles)**: 해로운 기술 개발을 지양합니다.`,
      likeCount: 1,
      isSelected: false,
    },
  });

  console.log('✅ 작업물 4개 생성 완료');

  // 7. 댓글 생성 (Comment)
  await prisma.comment.createMany({
    data: [
      {
        workId: work1.id,
        authorId: proUser1.id,
        content: '번역 퀄리티가 아주 좋습니다!',
      },
      {
        workId: work1.id,
        authorId: normalUser3.id,
        content: '이 부분은 이렇게 해석하는 게 더 자연스럽지 않을까요?',
      },
      {
        workId: work2.id,
        authorId: proUser2.id,
        content: '수고하셨습니다. 레이아웃 부분이 잘 정리되었네요.',
      },
      {
        workId: work3.id,
        authorId: normalUser1.id,
        content: '데코레이터 변경점이 많아서 어렵네요 ㅠㅠ 잘 봤습니다.',
      },
            { workId: work5.id, authorId: proUser1.id, content: 'Python 새 기능 정리 잘했어요!' },
        { workId: work6.id, authorId: proUser2.id, content: 'AI 윤리 번역 내용이 명확합니다.' },
        { workId: work3.id, authorId: normalUser5.id, content: '데코레이터 부분에 추가 설명이 필요해요.' },
        ],
  });

  console.log('✅ 댓글 4개 생성 완료');

  // 8. 좋아요 생성 (Like)
  await prisma.like.createMany({
    data: [
      { workId: work1.id, userId: proUser2.id },
      { workId: work1.id, userId: normalUser4.id },
      { workId: work2.id, userId: normalUser1.id },
      { workId: work3.id, userId: proUser1.id },
    ],
  });

  console.log('✅ 좋아요 4개 생성 완료');

  // 9. 알림 생성 (Notification)
  await prisma.notification.createMany({
    data: [
      {
        userId: proUser1.id,
        message:
          '신청하신 "Next.js App Router 딥다이브" 챌린지가 승인되었습니다.',
      },
      {
        userId: proUser1.id,
        message: '새로운 작업물이 제출되었습니다.',
      },
      {
        userId: normalUser1.id,
        message: '제출하신 작업물에 좋아요가 달렸습니다.',
      },
      {
        userId: normalUser3.id,
        message: '신청하신 "개인 일기장 번역하기" 챌린지가 반려되었습니다.',
      },
            { userId: normalUser5.id, message: '새로운 챌린지 "Python 3.12 새로운 기능 번역"이 등록되었습니다.' },
        { userId: normalUser6.id, message: '새로운 챌린지 "AI Ethics 가이드 번역"이 등록되었습니다.' },
        { userId: normalUser7.id, message: '작업물 "Python 3.12 새로운 기능"에 좋아요가 달렸습니다.' },
        ],
  });

  console.log('✅ 알림 4개 생성 완료');
  console.log('🎉 모든 시딩 데이터가 성공적으로 들어갔습니다!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
