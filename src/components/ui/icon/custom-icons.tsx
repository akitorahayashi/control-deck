import { type FC } from 'react'

export const UserIcon: FC = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="16" height="16" rx="4" fill="#FAFAFA" />
      <path
        d="M11.5 12.5V11.5C11.5 10.9696 11.2893 10.4609 10.9142 10.0858C10.5391 9.71071 10.0304 9.5 9.5 9.5H6.5C5.96957 9.5 5.46086 9.71071 5.08579 10.0858C4.71071 10.4609 4.5 10.9696 4.5 11.5V12.5M10 5.5C10 6.60457 9.10457 7.5 8 7.5C6.89543 7.5 6 6.60457 6 5.5C6 4.39543 6.89543 3.5 8 3.5C9.10457 3.5 10 4.39543 10 5.5Z"
        stroke="#18181B"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const AgentIcon: FC = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="16" height="16" rx="4" fill="#FF4017" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.70226 6.05678C3.45553 6.06203 3.25125 5.86627 3.246 5.61953C3.22669 4.71202 3.45412 3.98771 4.05158 3.56286C4.62138 3.15769 5.40509 3.11931 6.26087 3.24653C6.50498 3.28281 6.67346 3.51012 6.63717 3.75423C6.60089 3.99834 6.37358 4.16682 6.12947 4.13053C5.33187 4.01197 4.8465 4.09424 4.5695 4.29121C4.32016 4.46851 4.12308 4.82784 4.13952 5.60052C4.14477 5.84726 3.949 6.05153 3.70226 6.05678Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3156 6.05678C12.5623 6.06203 12.7666 5.86627 12.7718 5.61953C12.7911 4.71202 12.5637 3.98771 11.9662 3.56286C11.3964 3.15769 10.6127 3.11931 9.75695 3.24653C9.51284 3.28281 9.34436 3.51012 9.38065 3.75423C9.41694 3.99834 9.64424 4.16682 9.88836 4.13053C10.686 4.01197 11.1713 4.09424 11.4483 4.29121C11.6977 4.46851 11.8947 4.82784 11.8783 5.60052C11.8731 5.84726 12.0688 6.05153 12.3156 6.05678Z"
        fill="white"
      />
      <path
        d="M7.25597 7.86712C7.25597 8.28683 6.91573 8.62707 6.49603 8.62707C6.07632 8.62707 5.73608 8.28683 5.73608 7.86712C5.73608 7.44742 6.07632 7.10718 6.49603 7.10718C6.91573 7.10718 7.25597 7.44742 7.25597 7.86712Z"
        fill="white"
      />
      <path
        d="M10.409 7.86712C10.409 8.28683 10.0688 8.62707 9.6491 8.62707C9.2294 8.62707 8.88916 8.28683 8.88916 7.86712C8.88916 7.44742 9.2294 7.10718 9.6491 7.10718C10.0688 7.10718 10.409 7.44742 10.409 7.86712Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3153 9.97544C12.5621 9.9702 12.7663 10.166 12.7716 10.4127C12.7909 11.3202 12.5635 12.0445 11.966 12.4694C11.3962 12.8745 10.6125 12.9129 9.7567 12.7857C9.51259 12.7494 9.34412 12.5221 9.38041 12.278C9.41669 12.0339 9.644 11.8654 9.88811 11.9017C10.6857 12.0203 11.1711 11.938 11.4481 11.741C11.6974 11.5637 11.8945 11.2044 11.8781 10.4317C11.8728 10.185 12.0686 9.98069 12.3153 9.97544Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.70251 9.97544C3.45577 9.9702 3.25149 10.166 3.24624 10.4127C3.22693 11.3202 3.45436 12.0445 4.05183 12.4694C4.62162 12.8745 5.40533 12.9129 6.26112 12.7857C6.50523 12.7494 6.6737 12.5221 6.63742 12.278C6.60113 12.0339 6.37382 11.8654 6.12971 11.9017C5.33212 12.0203 4.84675 11.938 4.56974 11.741C4.32041 11.5637 4.12332 11.2044 4.13976 10.4317C4.14501 10.185 3.94924 9.98069 3.70251 9.97544Z"
        fill="white"
      />
    </svg>
  )
}








export const SheetIcon: FC = ({ ...props }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 2V14M10.6667 10L8.66667 8L10.6667 6M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const NextjsTag: FC = ({ ...props }) => (
  <svg
    width="29"
    height="30"
    viewBox="12 0 29 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_dd_2859_5307)">
      <rect
        x="12.1167"
        y="2"
        width="28"
        height="28"
        rx="8"
        fill="#FAFAFA"
        shapeRendering="crispEdges"
      />
      <g clipPath="url(#clip0_2859_5307)">
        <rect
          width="20"
          height="20"
          transform="translate(16.1167 6)"
          fill="white"
        />
        <path
          d="M30.9598 24.7533C30.8854 24.7927 30.8917 24.8052 30.9629 24.7689C30.9861 24.7595 31.0055 24.7464 31.0223 24.7308C31.0223 24.7177 31.0223 24.7177 30.9598 24.7533ZM31.1098 24.672C31.0742 24.7014 31.0742 24.7014 31.1167 24.682C31.1392 24.6689 31.1592 24.6564 31.1592 24.6527C31.1592 24.6358 31.1492 24.6395 31.1098 24.672ZM31.2073 24.6133C31.1717 24.6427 31.1717 24.6427 31.2142 24.6233C31.2373 24.6102 31.2567 24.5964 31.2567 24.5933C31.2567 24.5777 31.2467 24.5808 31.2073 24.6133ZM31.3061 24.5552C31.2704 24.5845 31.2704 24.5845 31.3117 24.5645C31.3348 24.552 31.3542 24.5389 31.3542 24.5352C31.3542 24.5195 31.3442 24.5227 31.3061 24.5552ZM31.4392 24.467C31.3711 24.5127 31.3473 24.542 31.4098 24.5095C31.4517 24.4839 31.5229 24.4277 31.5104 24.4277C31.4836 24.4377 31.4611 24.4545 31.4386 24.467H31.4392ZM25.4623 6.00704C25.4167 6.01016 25.2798 6.02266 25.1598 6.03266C22.3173 6.29016 19.6579 7.82016 17.9723 10.177C17.0404 11.4689 16.4354 12.9695 16.2073 14.5452C16.1267 15.0952 16.1167 15.2577 16.1167 16.0033C16.1167 16.7483 16.1267 16.9083 16.2073 17.4583C16.7517 21.2152 19.4242 24.3689 23.0467 25.5377C23.6986 25.7458 24.3817 25.8895 25.1598 25.9777C25.4623 26.0102 26.7704 26.0102 27.0729 25.9777C28.4179 25.8277 29.5536 25.4958 30.6773 24.9227C30.8498 24.8352 30.8823 24.812 30.8592 24.7927C30.3092 24.067 29.7692 23.3408 29.2286 22.6083L27.6304 20.4502L25.6286 17.4845C24.9611 16.492 24.2911 15.502 23.6104 14.5195C23.6036 14.5195 23.5948 15.8377 23.5911 17.4452C23.5842 20.2608 23.5842 20.3752 23.5486 20.4402C23.5129 20.5183 23.4542 20.5833 23.3761 20.6195C23.3142 20.6489 23.2586 20.6552 22.9629 20.6552H22.6248L22.5367 20.6002C22.4817 20.5645 22.4361 20.5152 22.4067 20.457L22.3642 20.3689L22.3673 16.4495L22.3742 12.5302L22.4361 12.452C22.4754 12.4039 22.5242 12.3645 22.5792 12.3352C22.6611 12.2958 22.6936 12.2895 23.0317 12.2895C23.4286 12.2895 23.4942 12.3052 23.5986 12.4195C24.4086 13.627 25.2161 14.8377 26.0104 16.052C27.3098 18.022 29.0836 20.7102 29.9554 22.0289L31.5411 24.4283L31.6192 24.3764C32.3811 23.8683 33.0742 23.2633 33.6723 22.5733C34.9323 21.1308 35.7498 19.3564 36.0267 17.4627C36.1073 16.9127 36.1173 16.7495 36.1173 16.0045C36.1173 15.2589 36.1073 15.0995 36.0267 14.5495C35.4823 10.7927 32.8098 7.63891 29.1873 6.46954C28.5098 6.25516 27.8129 6.10891 27.1073 6.03391C26.9179 6.01454 25.6254 5.99141 25.4629 6.00829L25.4623 6.00704ZM29.5542 12.0552C29.6486 12.1002 29.7198 12.1852 29.7523 12.2827C29.7692 12.3352 29.7723 13.422 29.7692 15.8702L29.7623 19.3852L29.1442 18.4352L28.5223 17.4845V14.9327C28.5223 13.2783 28.5292 12.3508 28.5379 12.3052C28.5673 12.2008 28.6386 12.1133 28.7336 12.0583C28.8111 12.0189 28.8411 12.0158 29.1504 12.0158C29.4398 12.0158 29.4892 12.0189 29.5542 12.0552Z"
          fill="black"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_2859_5307"
        x="0.116699"
        y="0"
        width="52"
        height="52"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="3"
          operator="erode"
          in="SourceAlpha"
          result="effect1_dropShadow_2859_5307"
        />
        <feOffset dy="10" />
        <feGaussianBlur stdDeviation="7.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2859_5307"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="4"
          operator="erode"
          in="SourceAlpha"
          result="effect2_dropShadow_2859_5307"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_2859_5307"
          result="effect2_dropShadow_2859_5307"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_2859_5307"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_2859_5307">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(16.1167 6)"
        />
      </clipPath>
    </defs>
  </svg>
)

export const ShadcnTag: FC = ({ ...props }) => (
  <svg
    width="29"
    height="30"
    viewBox="12 0 29 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xlinkHref="http://www.w3.org/1999/xlink"
    {...props}
  >
    <g filter="url(#filter0_dd_2859_5310)">
      <rect
        x="12.1167"
        y="2"
        width="28"
        height="28"
        rx="8"
        fill="#FAFAFA"
        shapeRendering="crispEdges"
      />
      <g clipPath="url(#clip0_2859_5310)">
        <path
          d="M31.1167 6H21.1167C18.3553 6 16.1167 8.23858 16.1167 11V21C16.1167 23.7614 18.3553 26 21.1167 26H31.1167C33.8781 26 36.1167 23.7614 36.1167 21V11C36.1167 8.23858 33.8781 6 31.1167 6Z"
          fill="url(#pattern0_2859_5310)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_2859_5310"
        x="0.116699"
        y="0"
        width="52"
        height="52"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="3"
          operator="erode"
          in="SourceAlpha"
          result="effect1_dropShadow_2859_5310"
        />
        <feOffset dy="10" />
        <feGaussianBlur stdDeviation="7.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2859_5310"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="4"
          operator="erode"
          in="SourceAlpha"
          result="effect2_dropShadow_2859_5310"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_2859_5310"
          result="effect2_dropShadow_2859_5310"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_2859_5310"
          result="shape"
        />
      </filter>
      <pattern
        id="pattern0_2859_5310"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_2859_5310" transform="scale(0.005)" />
      </pattern>
      <clipPath id="clip0_2859_5310">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(16.1167 6)"
        />
      </clipPath>
      <image
        id="image0_2859_5310"
        width="200"
        height="200"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
)

export const TailwindTag: FC = ({ ...props }) => (
  <svg
    width="29"
    height="30"
    viewBox="12 0 29 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_dd_2859_5313)">
      <rect
        x="12.1167"
        y="2"
        width="28"
        height="28"
        rx="8"
        fill="#FAFAFA"
        shapeRendering="crispEdges"
      />
      <rect x="16.1167" y="6" width="20" height="20" rx="5" fill="#18181B" />
      <mask
        id="mask0_2859_5313"
        // style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="20"
        y="12"
        width="13"
        height="8"
      >
        <path
          d="M20.1167 12.3999H32.1167V19.5999H20.1167V12.3999Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_2859_5313)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.1167 12.3999C24.5167 12.3999 23.5167 13.1999 23.1167 14.7999C23.7167 13.9999 24.4167 13.6999 25.2167 13.8999C25.6731 14.0139 25.9994 14.3452 26.3605 14.7117C26.9487 15.3088 27.6296 15.9999 29.1167 15.9999C30.7167 15.9999 31.7167 15.1999 32.1167 13.5999C31.5167 14.3999 30.8167 14.6999 30.0167 14.4999C29.5603 14.3859 29.234 14.0546 28.8729 13.6881C28.2847 13.091 27.6038 12.3999 26.1167 12.3999ZM23.1167 15.9999C21.5167 15.9999 20.5167 16.7999 20.1167 18.3999C20.7167 17.5999 21.4167 17.2999 22.2167 17.4999C22.6731 17.6141 22.9994 17.9452 23.3605 18.3117C23.9487 18.9088 24.6296 19.5999 26.1167 19.5999C27.7167 19.5999 28.7167 18.7999 29.1167 17.1999C28.5167 17.9999 27.8167 18.2999 27.0167 18.0999C26.5603 17.9859 26.234 17.6546 25.8729 17.2881C25.2847 16.691 24.6038 15.9999 23.1167 15.9999Z"
          fill="#FAFAFA"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_2859_5313"
        x="0.116699"
        y="0"
        width="52"
        height="52"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="3"
          operator="erode"
          in="SourceAlpha"
          result="effect1_dropShadow_2859_5313"
        />
        <feOffset dy="10" />
        <feGaussianBlur stdDeviation="7.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2859_5313"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="4"
          operator="erode"
          in="SourceAlpha"
          result="effect2_dropShadow_2859_5313"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_2859_5313"
          result="effect2_dropShadow_2859_5313"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_2859_5313"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export const ReasoningIcon: FC = ({ ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="24" height="24" rx="6" fill="#27272A" />
    <g clipPath="url(#clip0_8154_2999)">
      <path
        d="M11.9999 7.00004C11.9999 6.78117 11.9568 6.56445 11.873 6.36224C11.7893 6.16003 11.6665 5.97629 11.5117 5.82153C11.357 5.66677 11.1732 5.544 10.971 5.46024C10.7688 5.37648 10.5521 5.33337 10.3332 5.33337C9.94409 5.33296 9.56708 5.46871 9.26754 5.71711C8.968 5.96551 8.76483 6.31089 8.69323 6.69337C8.47346 6.73455 8.26423 6.81952 8.07798 6.94323C7.89174 7.06694 7.73229 7.22686 7.60912 7.41347C7.48596 7.60008 7.40161 7.80956 7.36108 8.02944C7.32055 8.24933 7.32468 8.47512 7.37322 8.69338C7.07233 8.74679 6.79192 8.88191 6.56264 9.08395C6.33336 9.28599 6.16405 9.54718 6.07321 9.83897C5.98237 10.1308 5.97351 10.4419 6.04758 10.7384C6.12166 11.0349 6.27583 11.3053 6.49323 11.52C6.12758 11.6889 5.82141 11.9641 5.6148 12.3098C5.40819 12.6555 5.31075 13.0555 5.33525 13.4575C5.35974 13.8595 5.50502 14.2447 5.75208 14.5628C5.99914 14.8808 6.33646 15.1169 6.71989 15.24C6.64668 15.5166 6.6459 15.8074 6.71762 16.0843C6.78933 16.3613 6.93114 16.6151 7.12938 16.8214C7.32762 17.0277 7.57562 17.1795 7.84951 17.2621C8.12341 17.3448 8.41397 17.3555 8.69323 17.2934C8.76732 17.7026 8.99176 18.0694 9.32246 18.3216C9.65316 18.5739 10.0662 18.6933 10.4805 18.6566C10.8948 18.6198 11.2804 18.4295 11.5615 18.123C11.8426 17.8165 11.999 17.416 11.9999 17M11.9999 7.00004V17M11.9999 7.00004C11.9999 6.55801 12.1755 6.13409 12.488 5.82153C12.8006 5.50897 13.2245 5.33337 13.6666 5.33337C14.0557 5.33296 14.4327 5.46871 14.7322 5.71711C15.0318 5.96551 15.235 6.31089 15.3066 6.69337C15.5263 6.73455 15.7356 6.81952 15.9218 6.94323C16.108 7.06694 16.2675 7.22686 16.3907 7.41347C16.5138 7.60008 16.5982 7.80956 16.6387 8.02944C16.6792 8.24933 16.6751 8.47512 16.6266 8.69338C16.9275 8.74679 17.2079 8.88191 17.4371 9.08395C17.6664 9.28599 17.8357 9.54718 17.9266 9.83897C18.0174 10.1308 18.0263 10.4419 17.9522 10.7384C17.8781 11.0349 17.724 11.3053 17.5066 11.52C17.8722 11.6889 18.1784 11.9641 18.385 12.3098C18.5916 12.6555 18.689 13.0555 18.6645 13.4575C18.64 13.8595 18.4948 14.2447 18.2477 14.5628C18.0006 14.8808 17.6633 15.1169 17.2799 15.24C17.3531 15.5166 17.3539 15.8074 17.2822 16.0843C17.2105 16.3613 17.0686 16.6151 16.8704 16.8214C16.6722 17.0277 16.4242 17.1795 16.1503 17.2621C15.8764 17.3448 15.5858 17.3555 15.3066 17.2934C15.2325 17.7026 15.008 18.0694 14.6773 18.3216C14.3466 18.5739 13.9336 18.6933 13.5193 18.6566C13.105 18.6198 12.7194 18.4295 12.4383 18.123C12.1572 17.8165 12.0008 17.416 11.9999 17"
        stroke="#FAFAFA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8154_2999">
        <rect width="16" height="16" fill="white" transform="translate(4 4)" />
      </clipPath>
    </defs>
  </svg>
)

export const ReferencesIcon: FC = ({ ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="24" height="24" rx="6" fill="#27272A" />
    <g clipPath="url(#clip0_8556_11986)">
      <path
        d="M10.6667 17.5089C8.60809 17.0124 6.9877 15.392 6.49124 13.3333M17.5092 13.3334C17.0127 15.392 15.3923 17.0124 13.3338 17.5089M13.3336 6.49109C15.3923 6.98757 17.0127 8.60799 17.5092 10.6666M6.49137 10.6667C6.98784 8.60803 8.60829 6.98757 10.667 6.49109M6.40016 13.3334H6.9335C7.30686 13.3334 7.49355 13.3334 7.63616 13.2607C7.7616 13.1968 7.86358 13.0948 7.9275 12.9694C8.00016 12.8268 8.00016 12.6401 8.00016 12.2667V11.7334C8.00016 11.36 8.00016 11.1733 7.9275 11.0307C7.86358 10.9053 7.7616 10.8033 7.63616 10.7394C7.49355 10.6667 7.30686 10.6667 6.9335 10.6667H6.40016C6.02679 10.6667 5.84011 10.6667 5.6975 10.7394C5.57206 10.8033 5.47007 10.9053 5.40616 11.0307C5.3335 11.1733 5.3335 11.36 5.3335 11.7334V12.2667C5.3335 12.6401 5.3335 12.8268 5.40616 12.9694C5.47007 13.0948 5.57206 13.1968 5.6975 13.2607C5.84011 13.3334 6.02679 13.3334 6.40016 13.3334ZM17.0668 13.3334H17.6002C17.9735 13.3334 18.1602 13.3334 18.3028 13.2607C18.4283 13.1968 18.5303 13.0948 18.5942 12.9694C18.6668 12.8268 18.6668 12.6401 18.6668 12.2667V11.7334C18.6668 11.36 18.6668 11.1733 18.5942 11.0307C18.5303 10.9053 18.4283 10.8033 18.3028 10.7394C18.1602 10.6667 17.9735 10.6667 17.6002 10.6667H17.0668C16.6935 10.6667 16.5068 10.6667 16.3642 10.7394C16.2387 10.8033 16.1367 10.9053 16.0728 11.0307C16.0002 11.1733 16.0002 11.36 16.0002 11.7334V12.2667C16.0002 12.6401 16.0002 12.8268 16.0728 12.9694C16.1367 13.0948 16.2387 13.1968 16.3642 13.2607C16.5068 13.3334 16.6935 13.3334 17.0668 13.3334ZM11.7335 8.00004H12.2668C12.6402 8.00004 12.8269 8.00004 12.9695 7.92738C13.0949 7.86346 13.1969 7.76148 13.2608 7.63603C13.3335 7.49343 13.3335 7.30674 13.3335 6.93337V6.40004C13.3335 6.02667 13.3335 5.83999 13.2608 5.69738C13.1969 5.57194 13.0949 5.46995 12.9695 5.40604C12.8269 5.33337 12.6402 5.33337 12.2668 5.33337H11.7335C11.3601 5.33337 11.1734 5.33337 11.0308 5.40604C10.9054 5.46995 10.8034 5.57194 10.7395 5.69738C10.6668 5.83999 10.6668 6.02667 10.6668 6.40004V6.93337C10.6668 7.30674 10.6668 7.49343 10.7395 7.63603C10.8034 7.76148 10.9054 7.86346 11.0308 7.92738C11.1734 8.00004 11.3601 8.00004 11.7335 8.00004ZM11.7335 18.6667H12.2668C12.6402 18.6667 12.8269 18.6667 12.9695 18.594C13.0949 18.5301 13.1969 18.4281 13.2608 18.3027C13.3335 18.1601 13.3335 17.9734 13.3335 17.6V17.0667C13.3335 16.6933 13.3335 16.5067 13.2608 16.364C13.1969 16.2386 13.0949 16.1366 12.9695 16.0727C12.8269 16 12.6402 16 12.2668 16H11.7335C11.3601 16 11.1734 16 11.0308 16.0727C10.9054 16.1366 10.8034 16.2386 10.7395 16.364C10.6668 16.5067 10.6668 16.6933 10.6668 17.0667V17.6C10.6668 17.9734 10.6668 18.1601 10.7395 18.3027C10.8034 18.4281 10.9054 18.5301 11.0308 18.594C11.1734 18.6667 11.3601 18.6667 11.7335 18.6667Z"
        stroke="#FAFAFA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8556_11986">
        <rect width="16" height="16" fill="white" transform="translate(4 4)" />
      </clipPath>
    </defs>
  </svg>
)
